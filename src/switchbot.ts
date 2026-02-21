import * as core from '@actions/core';

const BASE_URL = 'https://api.switch-bot.com/v1.0/';

const TIMEOUT_MS = 1000;

function getHeaders(): Record<string, string> {
  return {
    Authorization: core.getInput('token'),
    'Content-Type': 'application/json; charset=utf8'
  };
}

function createTimeoutSignal(): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), TIMEOUT_MS);
  return controller.signal;
}

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
    const response = await fetch(`${BASE_URL}scenes`, {
      headers: getHeaders(),
      signal: createTimeoutSignal()
    });
    const data: ListSceneResponse = await response.json();
    for (const element of data.body) {
      if (element.sceneName === name) {
        return element.sceneId;
      }
    }

    throw new Error(`can not find scene: ${name}`);
  } catch (_error) {
    throw new Error('failed to get scence id');
  }
}

export async function getDeviceIdByName(name: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}devices`, {
      headers: getHeaders(),
      signal: createTimeoutSignal()
    });
    const data: ListDeviceResponse = await response.json();
    for (const element of data.body.deviceList) {
      if (element.deviceName === name) {
        return element.deviceId;
      }
    }

    throw new Error(`can not find device: ${name}`);
  } catch (_error) {
    throw new Error('failed to get device id');
  }
}

export async function executeScene(id: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}scenes/${id}/execute`, {
      method: 'POST',
      headers: getHeaders(),
      signal: createTimeoutSignal()
    });
  } catch (_error) {
    throw new Error(`failed to execute scence id: ${id}`);
  }
}

export async function commandDevice(
  id: string,
  command: string
): Promise<void> {
  try {
    await fetch(`${BASE_URL}devices/${id}/commands`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ command }),
      signal: createTimeoutSignal()
    });
  } catch (_error) {
    throw new Error(`failed to command device id: ${id}`);
  }
}
