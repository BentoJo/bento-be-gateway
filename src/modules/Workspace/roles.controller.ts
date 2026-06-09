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
  DeleteRoleRequest,
  DeleteRoleResponse,
  RemovePermissionsRequest,
  RemovePermissionsResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
} from '../../shared/types/workspace/roles';
import { firstValueFrom } from 'rxjs';

@Controller('workspace/roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('/')
  createRole(
    @Body() body: CreateRoleRequest,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateRoleResponse> {
    return firstValueFrom(this.workspaceService.createRole(body, req.user));
  }

  @Put('/:roleId')
  updateRole(
    @Param('roleId') roleId: string,
    @Body() body: Omit<UpdateRoleRequest, 'roleId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<UpdateRoleResponse> {
    return firstValueFrom(
      this.workspaceService.updateRole({ ...body, roleId }, req.user),
    );
  }

  @Delete('/:roleId')
  deleteRole(
    @Param('roleId') roleId: string,
    @Body() body: Omit<DeleteRoleRequest, 'roleId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<DeleteRoleResponse> {
    return firstValueFrom(
      this.workspaceService.deleteRole({ ...body, roleId }, req.user),
    );
  }

  @Post('/:roleId/permissions')
  assignPermissionsToRole(
    @Param('roleId') roleId: string,
    @Body() body: Omit<AssignPermissionsRequest, 'roleId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<AssignPermissionsResponse> {
    return firstValueFrom(
      this.workspaceService.assignPermissionsToRole(
        { ...body, roleId },
        req.user,
      ),
    );
  }

  @Delete('/:roleId/permissions')
  removePermissionsFromRole(
    @Param('roleId') roleId: string,
    @Body() body: Omit<RemovePermissionsRequest, 'roleId'>,
    @Req() req: AuthenticatedRequest,
  ): Promise<RemovePermissionsResponse> {
    return firstValueFrom(
      this.workspaceService.removePermissionsFromRole(
        { ...body, roleId },
        req.user,
      ),
    );
  }
}
