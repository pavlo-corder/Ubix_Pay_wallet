# Quasar App (ubix)

A Quasar Framework app

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


<hr>

<h2>The rules for working with the Ubix Pay project repository.</h2>

The repository can be found on github via the following link: https://github.com/SilentNotaryEcosystem/Ubixpay-logics/tree/development

There are two main branches in the repository.

main - it is the branch where the tested version is located.

development - it is the branch where all developers' branches merge - the product is being tested in this branch.

The creation of branches to perform tasks is done from the development branch. The naming is accomplished according to the following example:

task/{name of the task from JIRA}

For example:

    task/UBIX-32

After completing the tasks, you need to upload the branch with commits to the repository. Also, It is necessary to remember to notify the colleagues about it - in the chat.

If, in the working process, there are updates to the development branch, then it is necessary to upload the changes. This will as well be announced in the chat.

The general rule is a daily morning check of changes in the development branch. This applies in case automatic notification is not provided on your IDE.
