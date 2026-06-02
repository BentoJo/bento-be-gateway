import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';
import type {
  AcceptWorkspaceInviteRequest,
  GetWorkspaceMemberRequest,
  GetWorkspaceMemberRoleRequest,
  InviteWorkspaceMemberRequest,
  ListWorkspaceInvitesRequest,
  ListWorkspaceMembersRequest,
  RejectWorkspaceInviteRequest,
  RemoveWorkspaceMemberRequest,
  UpdateWorkspaceMemberRoleRequest,
  ValidateWorkspaceMembershipRequest,
} from './types';
import { WorkspaceMembersService } from './workspace-members.service';

@Controller('workspace')
export class WorkspaceMembersController {
  constructor(
    private readonly workspaceMembersService: WorkspaceMembersService,
  ) {}

  @Post('/:workspaceId/members/invite')
  @UseGuards(AuthGuard)
  inviteWorkspaceMember(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<InviteWorkspaceMemberRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.inviteWorkspaceMember(
      { workspaceId, ...body },
      req.user,
    );
  }

  @Post('/invites/accept')
  @UseGuards(AuthGuard)
  acceptWorkspaceInvite(
    @Body() body: AcceptWorkspaceInviteRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.acceptWorkspaceInvite(body, req.user);
  }

  @Post('/invites/reject')
  rejectWorkspaceInvite(@Body() body: RejectWorkspaceInviteRequest) {
    return this.workspaceMembersService.rejectWorkspaceInvite(body);
  }

  @Get('/invitations/me')
  @UseGuards(AuthGuard)
  listMyInvitations(@Req() req: AuthenticatedRequest) {
    return this.workspaceMembersService.listMyInvitations(req.user);
  }

  @Get('/:workspaceId/members/:memberId/role')
  @UseGuards(AuthGuard)
  getWorkspaceMemberRole(
    @Param() params: GetWorkspaceMemberRoleRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.getWorkspaceMemberRole(
      params,
      req.user,
    );
  }

  @Get('/:workspaceId/members/:memberId')
  @UseGuards(AuthGuard)
  getWorkspaceMember(
    @Param() params: GetWorkspaceMemberRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.getWorkspaceMember(params, req.user);
  }

  @Post('/:workspaceId/members')
  @UseGuards(AuthGuard)
  listWorkspaceMembers(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<ListWorkspaceMembersRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.listWorkspaceMembers(
      { workspaceId, ...body },
      req.user,
    );
  }

  @Post('/:workspaceId/invites')
  @UseGuards(AuthGuard)
  listWorkspaceInvites(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<ListWorkspaceInvitesRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.listWorkspaceInvites(
      { workspaceId, ...body },
      req.user,
    );
  }

  @Delete('/:workspaceId/members/:memberId')
  @UseGuards(AuthGuard)
  removeWorkspaceMember(
    @Param() params: RemoveWorkspaceMemberRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.removeWorkspaceMember(params, req.user);
  }

  @Put('/:workspaceId/members/:memberId/role')
  @UseGuards(AuthGuard)
  updateWorkspaceMemberRole(
    @Param() params: GetWorkspaceMemberRoleRequest,
    @Body() body: Pick<UpdateWorkspaceMemberRoleRequest, 'authzRoleId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.workspaceMembersService.updateWorkspaceMemberRole(
      { ...params, ...body },
      req.user,
    );
  }

  @Post('/:workspaceId/members/validate')
  validateWorkspaceMembership(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<ValidateWorkspaceMembershipRequest, 'workspaceId'>,
  ) {
    return this.workspaceMembersService.validateWorkspaceMembership({
      workspaceId,
      ...body,
    });
  }
}
