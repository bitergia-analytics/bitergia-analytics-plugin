# Bitergia Analytics Plugin

Bitergia Analytics Plugin for Kibana 7.10.0

## Installation steps

Run the following command inside `kibana/bin`.

```
kibana-plugin install "https://github.com/Bitergia/bitergia-analytics-plugin/releases/download/0.0.1_7.10.0/bitergiaAnalytics-7.10.0.zip"
```

## Contributing

### Setup

1. Download Elasticsearch for the version that matches the [Kibana version specified in package.json](./package.json#L7).
1. Download the Kibana source code for the [version specified in package.json](./package.json#L7) you want to set up.

   See the [Kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#setting-up-your-development-environment) for more instructions on setting up your development environment.

1. Change your node version to the version specified in `.node-version` inside the Kibana root directory.
1. Create a `plugins` directory inside the Kibana source code directory, if `plugins` directory doesn't exist.
1. Check out this package from version control into the `plugins` directory.
   ```
   git clone https://github.com/Bitergia/bitergia-analytics-plugin plugins --no-checkout
   cd plugins
   echo 'bitergia-analytics-plugin/*' >> .git/info/sparse-checkout
   git config core.sparseCheckout true
   ```
1. Run `yarn kbn bootstrap` inside `kibana/plugins/bitergia-analytics-plugin`.

Ultimately, your directory structure should look like this:

<!-- prettier-ignore -->
```md
.
├── kibana
│   └──plugins
│      └── bitergiaAnalytics
```

### Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/bitergiaAnalytics-7.10.0.zip`

### Run

- `yarn start`

  Starts Kibana and includes this plugin. Kibana will be available on `localhost:5601`.


## License

See the [LICENSE](./LICENSE.txt) file for our project's licensing. We will ask you to confirm the licensing of your contribution.

## Acknowledgments

Thanks to the great work of https://github.com/opendistro-for-elasticsearch/kibana-reports