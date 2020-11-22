import { Controller, Get, Param } from '@nestjs/common';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { success } from 'src/utils';

@Controller('agora')
export class AgoraComponent {
  @Get('get-token/:userId')
  getAgoraToken(@Param('userId') userId) {
    const appID = '0963340bf9fb45ca84026e1da0a4287f';
    // const channelName = liveClass._id;
    const channelName = 'liveClass._id';
    const appCertificate = 'afd9e56a27074913a64a1864f3c16087'; // afd9e56a27074913a64a1864f3c16087

    const uid = userId || 0;
    // const account = uuidv4();
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs,
    );

    const agoraLiveClassConfig = {
      appID,
      channelName,
      uid,
      role,
      tokenA,
    };

    return success('Token generated', agoraLiveClassConfig);
  }
}
