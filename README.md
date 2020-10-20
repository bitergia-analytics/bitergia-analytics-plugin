# Kibana Custom Menu for Kibiter

PoC for the Kibiter Custom Menu

## Setup

1. Download Elasticsearch for the version that matches the [Kibana version specified in package.json](./package.json#L7).
1. Download the Kibana source code for the [version specified in package.json](./package.json#L7) you want to set up.

   See the [Kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#setting-up-your-development-environment) for more instructions on setting up your development environment.

1. Change your node version to the version specified in `.node-version` inside the Kibana root directory.
1. Create a `plugins` directory inside the Kibana source code directory, if `plugins` directory doesn't exist.
1. Check out this package from version control into the `plugins` directory.
   ```
   git clone https://github.com/dlumbrer/kibiter-menu-plugin plugins --no-checkout
   cd plugins
   echo 'kibana-menu-plugin/*' >> .git/info/sparse-checkout
   git config core.sparseCheckout true
   ```
1. Run `yarn kbn bootstrap` inside `kibana/plugins/kibana-menu-plugin`.

Ultimately, your directory structure should look like this:

<!-- prettier-ignore -->
```md
.
├── kibana
│   └──plugins
│      └── kibana-menu-plugin
```

## Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/kibana-menu-plugin-0.0.1.zip`

## Run

- `yarn start`

  Starts Kibana and includes this plugin. Kibana will be available on `localhost:5601`.


## License

See the [LICENSE](./LICENSE.txt) file for our project's licensing. We will ask you to confirm the licensing of your contribution.

## Acknowledgments

Thanks to the great work of https://github.com/opendistro-for-elasticsearch/kibana-reports