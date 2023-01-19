# action-switchbot

Operate SwitchBot using GitHub Actions.

https://user-images.githubusercontent.com/21009186/161438435-23a94ada-91e6-47b9-a18f-3071a7e8661b.MOV

## Inputs

### `token`

**Required** SwitchBot token used to create a client.

Check [here](https://github.com/OpenWonderLabs/SwitchBotAPI#getting-started) for how to get token.

Recommended to use [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

### `deviceName`

Either `deviceName` or `sceneName` is required.

### `command`

Supports `turnOff`, `turnOn` and `press`.
Default is `press`.

### `sceneName`

Either `deviceName` or `sceneName` is required.

## Example usage

If PR is approved, the light bulb will illuminate.

```yaml
name: Turn on the light
on:
  pull_request_review:
    types: [submitted]

jobs:
  turn-on:
    runs-on: ubuntu-latest
    steps:
      - name: Turn on the light
        uses: Doarakko/action-switchbot@main
        with:
          token: ${{secrets.SWITCHBOT_TOKEN}}
          deviceName: light AA
          command: turnOn
```

## Reference

- [SwitchBot API Documents](https://github.com/OpenWonderLabs/SwitchBotAPI)
