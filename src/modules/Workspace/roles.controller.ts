import {
  Body,
  Controller,
  Delete,
  Param,
  Req,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';
import type {
  AssignPermissionsRequest,
  AssignPermissionsResponse,
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteRoleResponse,
  RemovePermissionsRequest,
  RemovePermissionsResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
} from '../../shared/types/workspace/roles';
import { firstValueFrom } from 'rxjs';

@Controller('workspace/:workspaceId/roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('/')
  createRole(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<CreateRoleRequest, 'scopeId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateRoleResponse> {
    return firstValueFrom(
      this.workspaceService.createRole(
        { ...body, scopeId: workspaceId },
        req.user,
      ),
    );
  }

  @Put('/:roleId')
  updateRole(
    @Param('workspaceId') workspaceId: string,
    @Param('roleId') roleId: string,
    @Body() body: Omit<UpdateRoleRequest, 'roleId' | 'scopeId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateRoleResponse> {
    return firstValueFrom(
      this.workspaceService.updateRole(
        { ...body, roleId, scopeId: workspaceId },
        req.user,
      ),
    );
  }

  @Delete('/:roleId')
  deleteRole(
    @Param('workspaceId') workspaceId: string,
    @Param('roleId') roleId: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<DeleteRoleResponse> {
    return firstValueFrom(
      this.workspaceService.deleteRole(
        { roleId, scopeId: workspaceId },
        req.user,
      ),
    );
  }

  @Post('/:roleId/permissions')
  assignPermissionsToRole(
    @Param('workspaceId') workspaceId: string,
    @Param('roleId') roleId: string,
    @Body() body: Omit<AssignPermissionsRequest, 'roleId' | 'scopeId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<AssignPermissionsResponse> {
    return firstValueFrom(
      this.workspaceService.assignPermissionsToRole(
        { ...body, roleId, scopeId: workspaceId },
        req.user,
      ),
    );
  }

  @Delete('/:roleId/permissions')
  removePermissionsFromRole(
    @Param('workspaceId') workspaceId: string,
    @Param('roleId') roleId: string,
    @Body() body: Omit<RemovePermissionsRequest, 'roleId' | 'scopeId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<RemovePermissionsResponse> {
    return firstValueFrom(
      this.workspaceService.removePermissionsFromRole(
        { ...body, roleId, scopeId: workspaceId },
        req.user,
      ),
    );
  }
}
