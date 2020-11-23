import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ValidateToken } from 'src/decorators/validatetoken.decorator';
import { LiveClassService } from 'src/services/liveClass.service';
import { success } from 'src/utils';
import { ResourceController } from './resource.controller';
import { groupBy } from 'lodash';
import * as moment from 'moment';
import {RtcTokenBuilder, RtcRole} from 'agora-access-token';

@Controller('live-class')
export class LiveClassController extends ResourceController {

  constructor(
    public service: LiveClassService,
  ) {
    super(service);
  }

  @ValidateToken()
  @Get()
  async getLiveClassCreatedByTeacher() {
    return success (
      'List Found successfully',
      await this.service.getLiveClassCreatedByTeacher()
      );
  }

  @ValidateToken()
  @Get('by-admin')
  async getLiveClassCreatedByAdmin() {
    return success(
      'List Found successfully',
      await this.service.getLiveClassCreatedByAdmin()
    );
  }

  @Delete(':liveClassId')
  async deleteLiveClassById(@Param('liveClassId') liveClassId) {
    await this.service.deleteLiveClassById(liveClassId);
    return success('Live Class deleted successfully', {});
  }


  @ValidateToken()
  @Post()
  async createLiveClass(@Req() request ) {
    const body = request.body; 
    const userId = request.user._id;
    return success(
      'Live class added!',
      await this.service.createLiveClass(body, userId),
    );
  };

  @ValidateToken()
  @Post('/by-admin')
  async createLiveClassByAdmin(@Req() request) {
    const body = request.body;
    return success(
      'Live class added!',
      await this.service.createLiveClassByAdmin(body),
    );
  };

  @ValidateToken()
  @Post('/validate-stream-code')
  async validateStreamCode(@Body() {streamCode}) {
    const liveClass= await this.service.findOne({streamCode: streamCode});
    if(liveClass === null) {
      return true;
    } 
    return false;
  }

  @ValidateToken()
  @Get('/get-teachers-live-class')
  async getAllLiveClassesByTeacherId(@Req() request) {
  const userId = request.user._id;
    // moment(dat).isToday();
    // moment(dat).isAfter();

    // moment(dat).isBefore();
  const classesList=  await this.service.getLiveClassByTeacherId(userId);

  // const classes = this.service.getPublicDetails(classesList);s
    const groupedClasses = groupBy(classesList, (classs) => {
      
      if (moment(classs.date).isSame(moment(), 'day')) {
        return 'TODAY';
      } else if (moment(classs.date).isBefore()) {
        return 'PAST';
      } else if (moment(classs.date).isAfter()) {
        return 'FUTURE';
      }

      return 'DEFAULT';
    });

    return success(
      'Live classes list found successfully!',
      {
        classesList,
        groupedClasses
      }
    );
  }

  @ValidateToken()
  @Put('/:liveClassId/accept-live-Class-request')
  async acceptLiveClasssRequest(@Param('liveClassId') id) {
    const liveClassModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRequest: true });
    return success(
      'Live class request accepted successfully',
      liveClassModel
    );
  }

  @ValidateToken()
  @Put('/:liveClassId/reject-live-Class-request')
  async rejectLiveClassRequest(@Param('liveClassId') id, @Body() rejectionReason) {
    console.log(id, rejectionReason);
    
    const liveClassModel = await this.service.findByIdAndUpdate(id, { hasAcceptedRequest: false, rejectionReason: rejectionReason.rejectionReason });
    return success(
      'Live class request rejected!',
      liveClassModel
    );
  }

  @ValidateToken()
  @Get('/:id')
  async getResource(@Param('id') id) {
    const liveClass = await this.service.findById(id);
    const appID = '0963340bf9fb45ca84026e1da0a4287f';
    // const channelName = liveClass._id;
    const channelName = 'liveClass._id';
    const appCertificate = 'afd9e56a27074913a64a1864f3c16087';

    const uid = 0;
    // const account = uuidv4();
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

    const agoraLiveClassConfig = {
      appID,
      channelName,
      uid,
      role,
      tokenA
    };

    return success(
      'Resource updated successfully!',
      {...liveClass.toJSON(), agoraLiveClassConfig}
    );
  }

}