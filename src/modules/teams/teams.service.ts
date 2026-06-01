import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  AddTeamMemberRequest,
  AddTeamMemberResponse,
  ArchiveTeamRequest,
  ArchiveTeamResponse,
  BulkAddTeamMembersRequest,
  BulkRemoveTeamMembersRequest,
  BulkTeamMembersResponse,
  CreateTeamRequest,
  DeleteTeamResponse,
  DeleteTeamRequest,
  GetTeamRequest,
  ListMemberTeamsRequest,
  ListMemberTeamsResponse,
  ListTeamMembersRequest,
  ListTeamMembersResponse,
  ListTeamsRequest,
  ListTeamsResponse,
  RemoveTeamMemberRequest,
  RemoveTeamMemberResponse,
  //   ResolveEffectiveTeamMembersRequest,
  //   ResolveEffectiveTeamMembersResponse,
  RestoreTeamRequest,
  RestoreTeamResponse,
  TeamResponse,
  UnarchiveTeamRequest,
  UnarchiveTeamResponse,
  UpdateTeamRequest,
} from './types';

interface TeamsServiceGrpc {
  CreateTeam(
    data: CreateTeamRequest,
    metadata: Metadata,
  ): Observable<TeamResponse>;
  GetTeam(data: GetTeamRequest, metadata: Metadata): Observable<TeamResponse>;
  UpdateTeam(
    data: UpdateTeamRequest,
    metadata: Metadata,
  ): Observable<TeamResponse>;
  DeleteTeam(
    data: DeleteTeamRequest,
    metadata: Metadata,
  ): Observable<DeleteTeamResponse>;
  RestoreTeam(
    data: RestoreTeamRequest,
    metadata: Metadata,
  ): Observable<RestoreTeamResponse>;
  ArchiveTeam(
    data: ArchiveTeamRequest,
    metadata: Metadata,
  ): Observable<ArchiveTeamResponse>;
  UnarchiveTeam(
    data: UnarchiveTeamRequest,
    metadata: Metadata,
  ): Observable<UnarchiveTeamResponse>;
  ListTeams(
    data: ListTeamsRequest,
    metadata: Metadata,
  ): Observable<ListTeamsResponse>;
  AddTeamMember(
    data: AddTeamMemberRequest,
    metadata: Metadata,
  ): Observable<AddTeamMemberResponse>;
  RemoveTeamMember(
    data: RemoveTeamMemberRequest,
    metadata: Metadata,
  ): Observable<RemoveTeamMemberResponse>;
  ListTeamMembers(
    data: ListTeamMembersRequest,
    metadata: Metadata,
  ): Observable<ListTeamMembersResponse>;
  BulkAddTeamMembers(
    data: BulkAddTeamMembersRequest,
    metadata: Metadata,
  ): Observable<BulkTeamMembersResponse>;
  BulkRemoveTeamMembers(
    data: BulkRemoveTeamMembersRequest,
    metadata: Metadata,
  ): Observable<BulkTeamMembersResponse>;
  ListMemberTeams(
    data: ListMemberTeamsRequest,
    metadata: Metadata,
  ): Observable<ListMemberTeamsResponse>;
  //   ResolveEffectiveTeamMembers(
  //     data: ResolveEffectiveTeamMembersRequest,
  //     metadata: Metadata,
  //   ): Observable<ResolveEffectiveTeamMembersResponse>;
}

@Injectable()
export class TeamsService implements OnModuleInit {
  private teamsServiceGrpc!: TeamsServiceGrpc;

  constructor(@Inject('TEAMS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.teamsServiceGrpc =
      this.client.getService<TeamsServiceGrpc>('TeamService');
  }

  createTeam(data: CreateTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.CreateTeam(data, buildRequiredUserMetadata(user)),
    );
  }

  getTeam(data: GetTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.GetTeam(data, buildRequiredUserMetadata(user)),
    );
  }

  updateTeam(data: UpdateTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.UpdateTeam(data, buildRequiredUserMetadata(user)),
    );
  }

  deleteTeam(data: DeleteTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.DeleteTeam(data, buildRequiredUserMetadata(user)),
    );
  }

  restoreTeam(data: RestoreTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.RestoreTeam(data, buildRequiredUserMetadata(user)),
    );
  }

  archiveTeam(data: ArchiveTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.ArchiveTeam(data, buildRequiredUserMetadata(user)),
    );
  }

  unarchiveTeam(data: UnarchiveTeamRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.UnarchiveTeam(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listTeams(data: ListTeamsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.ListTeams(data, buildRequiredUserMetadata(user)),
    );
  }

  addTeamMember(data: AddTeamMemberRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.AddTeamMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  removeTeamMember(data: RemoveTeamMemberRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.RemoveTeamMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listTeamMembers(data: ListTeamMembersRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.ListTeamMembers(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  bulkAddTeamMembers(data: BulkAddTeamMembersRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.BulkAddTeamMembers(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  bulkRemoveTeamMembers(
    data: BulkRemoveTeamMembersRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.teamsServiceGrpc.BulkRemoveTeamMembers(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listMemberTeams(data: ListMemberTeamsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.teamsServiceGrpc.ListMemberTeams(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  //   resolveEffectiveTeamMembers(
  //     data: ResolveEffectiveTeamMembersRequest,
  //     user: AuthenticatedUser,
  //   ) {
  //     return firstValueFrom(
  //       this.teamsServiceGrpc.ResolveEffectiveTeamMembers(
  //         data,
  //         buildRequiredUserMetadata(user),
  //       ),
  //     );
  //   }
}
