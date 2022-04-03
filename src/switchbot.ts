import * as core from '@actions/core';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.switch-bot.com/v1.0/',
  timeout: 1000,
  headers: {
    Authorization: core.getInput('token'),
    'Content-Type': 'application/json; charset=utf8'
  }
});

type ListSceneResponse = {
  statusCode: number;
  body: [
    {
      sceneId: string;
      sceneName: string;
    }
  ];
};

type ListDeviceResponse = {
  statusCode: number;
  body: {
    deviceList: [
      {
        deviceId: string;
        deviceName: string;
      }
    ];
  };
};

export async function getSceneIdByName(name: string): Promise<string> {
  try {
    const { data } = await client.get<ListSceneResponse>('scenes');
    for (const element of data.body) {
      if (element.sceneName === name) {
        return element.sceneId;
      }
    }

    throw new Error(`can not find scene: ${name}`);
  } catch (error) {
    throw new Error('failed to get scence id');
  }
}

export async function getDeviceIdByName(name: string): Promise<string> {
  try {
    const { data } = await client.get<ListDeviceResponse>('devices');
    for (const element of data.body.deviceList) {
      if (element.deviceName === name) {
        return element.deviceId;
      }
    }

    throw new Error(`can not find device: ${name}`);
  } catch (error) {
    throw new Error('failed to get device id');
  }
}

export async function executeScene(id: string): Promise<void> {
  try {
    await client.post(`scenes/${id}/execute`);
  } catch (error) {
    throw new Error(`failed to execute scence id: ${id}`);
  }
}

export async function commandDevice(
  id: string,
  command: string
): Promise<void> {
  try {
    await client.post(`devices/${id}/commands`, { command });
  } catch (error) {
    throw new Error(`failed to command device id: ${id}`);
  }
}
