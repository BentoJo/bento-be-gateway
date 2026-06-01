import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';
import type {
  AddTeamMemberRequest,
  ArchiveTeamRequest,
  BulkAddTeamMembersRequest,
  BulkRemoveTeamMembersRequest,
  CreateTeamRequest,
  DeleteTeamRequest,
  GetTeamRequest,
  ListMemberTeamsRequest,
  ListTeamMembersRequest,
  ListTeamsRequest,
  RemoveTeamMemberRequest,
  //   ResolveEffectiveTeamMembersRequest,
  RestoreTeamRequest,
  UnarchiveTeamRequest,
  UpdateTeamRequest,
} from './types';
import { TeamsService } from './teams.service';

@Controller('workspace')
@UseGuards(AuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('/:workspaceId/teams')
  createTeam(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<CreateTeamRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.createTeam({ workspaceId, ...body }, req.user);
  }

  @Get('/:workspaceId/teams')
  listTeams(
    @Param('workspaceId') workspaceId: string,
    @Query() query: Omit<ListTeamsRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.listTeams({ workspaceId, ...query }, req.user);
  }

  @Get('/:workspaceId/teams/:teamId')
  getTeam(@Param() params: GetTeamRequest, @Req() req: AuthenticatedRequest) {
    return this.teamsService.getTeam(params, req.user);
  }

  @Put('/:workspaceId/teams/:teamId')
  updateTeam(
    @Param() params: Pick<UpdateTeamRequest, 'workspaceId' | 'teamId'>,
    @Body() body: Omit<UpdateTeamRequest, 'workspaceId' | 'teamId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.updateTeam({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/teams/:teamId')
  deleteTeam(
    @Param() params: DeleteTeamRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.deleteTeam(params, req.user);
  }

  @Post('/:workspaceId/teams/:teamId/restore')
  restoreTeam(
    @Param() params: RestoreTeamRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.restoreTeam(params, req.user);
  }

  @Post('/:workspaceId/teams/:teamId/archive')
  archiveTeam(
    @Param() params: ArchiveTeamRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.archiveTeam(params, req.user);
  }

  @Post('/:workspaceId/teams/:teamId/unarchive')
  unarchiveTeam(
    @Param() params: UnarchiveTeamRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.unarchiveTeam(params, req.user);
  }

  @Post('/:workspaceId/teams/:teamId/members')
  addTeamMember(
    @Param() params: Pick<AddTeamMemberRequest, 'workspaceId' | 'teamId'>,
    @Body() body: Omit<AddTeamMemberRequest, 'workspaceId' | 'teamId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.addTeamMember({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/teams/:teamId/members/:userId')
  removeTeamMember(
    @Param() params: RemoveTeamMemberRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.removeTeamMember(params, req.user);
  }

  @Get('/:workspaceId/teams/:teamId/members')
  listTeamMembers(
    @Param() params: Pick<ListTeamMembersRequest, 'workspaceId' | 'teamId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.listTeamMembers(params, req.user);
  }

  @Post('/:workspaceId/teams/:teamId/members/bulk-add')
  bulkAddTeamMembers(
    @Param()
    params: Pick<BulkAddTeamMembersRequest, 'workspaceId' | 'teamId'>,
    @Body() body: Omit<BulkAddTeamMembersRequest, 'workspaceId' | 'teamId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.bulkAddTeamMembers(
      { ...params, ...body },
      req.user,
    );
  }

  @Post('/:workspaceId/teams/:teamId/members/bulk-remove')
  bulkRemoveTeamMembers(
    @Param()
    params: Pick<BulkRemoveTeamMembersRequest, 'workspaceId' | 'teamId'>,
    @Body() body: Omit<BulkRemoveTeamMembersRequest, 'workspaceId' | 'teamId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.bulkRemoveTeamMembers(
      { ...params, ...body },
      req.user,
    );
  }

  @Get('/:workspaceId/members/:userId/teams')
  listMemberTeams(
    @Param() params: ListMemberTeamsRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.teamsService.listMemberTeams(params, req.user);
  }

  //   @Post('/:workspaceId/teams/resolve-effective-members')
  //   resolveEffectiveTeamMembers(
  //     @Param('workspaceId') workspaceId: string,
  //     @Body() body: Omit<ResolveEffectiveTeamMembersRequest, 'workspaceId'>,
  //     @Req() req: AuthenticatedRequest,
  //   ) {
  //     return this.teamsService.resolveEffectiveTeamMembers(
  //       { workspaceId, ...body },
  //       req.user,
  //     );
  //   }
}
