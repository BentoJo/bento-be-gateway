import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Req,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import type {
  CreateWorkspaceRequest,
  GetWorkspaceRequest,
  ListUserWorkspacesRequest,
  UpdateWorkspaceRequest,
} from '../../shared/types/workspace/workspace';
import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';

@Controller('workspace')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('/create')
  createWorkspace(
    @Body() body: CreateWorkspaceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.createWorkspace(body, req.user);
  }

  @Get('/:workspaceId/overview')
  getWorkspaceOverview(
    @Param() params: GetWorkspaceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.getWorkspaceOverview(params, req.user);
  }

  @Get('/:workspaceId')
  getWorkspaceById(
    @Param() params: GetWorkspaceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.getWorkspaceById(params, req.user);
  }

  @Put('/:workspaceId')
  updateWorkspace(
    @Body() body: UpdateWorkspaceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.updateWorkspace(body, req.user);
  }

  @Delete('/:workspaceId')
  deleteWorkspace(
    @Param() params: GetWorkspaceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.deleteWorkspace(params, req.user);
  }

  @Post('/:workspaceId/restore')
  restoreWorkspace(
    @Param() params: GetWorkspaceRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.restoreWorkspace(params, req.user);
  }

  @Post('/:workspaceId/transfer-ownership')
  transferWorkspaceOwnership(
    @Param('workspaceId') workspaceId: string,
    @Body('newOwnerId') newOwnerId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.transferWorkspaceOwnership(
      {
        workspaceId,
        newOwnerId,
      },
      req.user,
    );
  }

  @Post('/:me/workspaces')
  listUserWorkspaces(
    @Body() data: ListUserWorkspacesRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceService.listUserWorkspaces(data, req.user);
  }
}
