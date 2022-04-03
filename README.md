# action-switchbot

Operate SwitchBot using GitHub Actions.

https://user-images.githubusercontent.com/21009186/161437327-2bc2b134-c9b3-4a94-b35e-05da12b664ca.MOV

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

If you comment "light on" on the GitHub issue, the light bulb will illuminate.

```yaml
name: Turn on the light on GitHub issue
on:
  issue_comment:
    types: [created]

jobs:
  turn-on:
    runs-on: ubuntu-latest
    steps:
      - name: Turn on the light
        uses: Doarakko/action-switchbot@main
        if: >-
          contains(github.event.comment.body, 'light on')
        with:
          token: ${{secrets.SWITCHBOT_TOKEN}}
          deviceName: light AA
          command: turnOn
```

## Reference

- [SwitchBot API Documents](https://github.com/OpenWonderLabs/SwitchBotAPI)
