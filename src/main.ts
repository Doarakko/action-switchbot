import * as core from '@actions/core';
import * as switchbot from './switchbot';

async function run(): Promise<void> {
  try {
    const deviceName: string = core.getInput('deviceName');
    const command: string = core.getInput('command');
    const sceneName: string = core.getInput('sceneName');

    if (deviceName === '' && sceneName === '') {
      throw new Error('deviceName or sceneName is required.');
    }

    if (
      deviceName !== '' &&
      !['turnOff', 'turnOn', 'press'].includes(command)
    ) {
      throw new Error(`${command} is an invalid command.`);
    }

    if (deviceName !== '') {
      const deviceId = await switchbot.getDeviceIdByName(deviceName);
      await switchbot.commandDevice(deviceId, command);
    } else {
      const sceneId = await switchbot.getSceneIdByName(sceneName);
      await switchbot.executeScene(sceneId);
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
