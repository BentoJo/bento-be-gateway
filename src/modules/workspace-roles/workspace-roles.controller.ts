import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';
import type {
  CheckPermissionRequest,
  CreateWorkspaceRoleRequest,
  DeleteWorkspaceRoleReferenceRequest,
  GetWorkspaceMemberRoleRequest,
  GetWorkspaceRoleFromAuthZRequest,
  GetWorkspaceRolesPermissionsFromAuthZRequest,
} from './types';
import { WorkspaceRolesService } from './workspace-roles.service';

@Controller('workspace')
export class WorkspaceRolesController {
  constructor(private readonly workspaceRolesService: WorkspaceRolesService) {}

  @Post('/:workspaceId/roles/from-authz/:authzRoleId')
  @UseGuards(AuthGuard)
  getWorkspaceRoleFromAuthZ(
    @Param() params: GetWorkspaceRoleFromAuthZRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceRolesService.getWorkspaceRoleFromAuthZ(
      params,
      req.user,
    );
  }

  @Get('/:workspaceId/roles')
  @UseGuards(AuthGuard)
  getWorkspaceRoles(
    @Param('workspaceId') workspaceId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceRolesService.getWorkspaceRoles(
      { workspaceId },
      req.user,
    );
  }

  @Post('/:workspaceId/roles')
  @UseGuards(AuthGuard)
  createWorkspaceRole(
    @Param('workspaceId') workspaceId: string,
    @Body() body: CreateWorkspaceRoleRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceRolesService.createWorkspaceRole(
      workspaceId,
      body,
      req.user,
    );
  }

  @Get('/:workspaceId/roles/:authzRoleId/permissions')
  @UseGuards(AuthGuard)
  getWorkspaceRolesPermissionsFromAuthZ(
    @Param() params: GetWorkspaceRolesPermissionsFromAuthZRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceRolesService.getWorkspaceRolesPermissionsFromAuthZ(
      params,
      req.user,
    );
  }

  @Delete('/:workspaceId/roles/:authzRoleId')
  @UseGuards(AuthGuard)
  deleteWorkspaceRole(
    @Param() params: DeleteWorkspaceRoleReferenceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceRolesService.deleteWorkspaceRole(params, req.user);
  }

  @Post('/:workspaceId/members/:userId/role')
  @UseGuards(AuthGuard)
  getWorkspaceMemberRole(@Param() params: GetWorkspaceMemberRoleRequest) {
    return this.workspaceRolesService.getWorkspaceMemberRole(params);
  }

  @Post('/:workspaceId/check-permission')
  @UseGuards(AuthGuard)
  checkPermission(@Body() body: CheckPermissionRequest) {
    return this.workspaceRolesService.checkPermission(body);
  }
}
