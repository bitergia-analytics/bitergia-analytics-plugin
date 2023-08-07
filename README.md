# Bitergia Analytics Plugin

Bitergia Analytics Plugin for OpenSearch.

This plugin allows to define a dashboards menu on the top bar of the app
and configure the branding of the app (color, logos, text, etc).


## Installation

You can find the different versions of the plugins on the
[releases page on Github](https://github.com/Bitergia/bitergia-analytics-plugin/releases).

Copy the link of the asset you want to install and run the following command inside
`opensearch-dashboards/bin` folder of your `opensearch-dashboard` instance.

```
opensearch-dashboards-plugin install <url>
```

For example:

```
opensearch-dashboards-plugin install https://github.com/Bitergia/bitergia-analytics-plugin/releases/download/0.0.3_1.2.0/bitergia-analytics-plugin-0.0.3_1.2.0.zip
```

## Developing

In order to make changes to this plugin or contributing to it, please read the following
sections.

### Prerequisites

You will need `node.js` and `yarn` to build the plugin. You can use
[nvm](https://github.com/nvm-sh/nvm) to install the required node version
of this plugin.

### Setup

1. Download **OpenSearch Dashboards** source code for the version that matches the
   [OpenSearch Dashboards version specified in opensearch_dashboards.json](./opensearch_dashboards.json#L4).
   You can download it from their
   [release page](https://github.com/opensearch-project/OpenSearch-Dashboards/releases)
   or clone the repository. We recommend to follow the
   [OpenSearch Dashboards' developers guide](https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/DEVELOPER_GUIDE.md#getting-started)
   to configure the environment.
1. Change your node version to the version specified in `.node-version` inside
   the **OpenSearch Dashboards** root directory. You can use `nvm` to do it.
1. Create a `plugins` directory inside the **OpenSearch Dashboards** source code
   directory, if `plugins` directory doesn't exist.
   ```
   cd OpenSearchDashboards
   mkdir plugins
   ```
1. Check out this repository into the `plugins` directory.
   ```
   git clone https://github.com/Bitergia/bitergia-analytics-plugin plugins
   ```
1. Install the dependencies.
   ```
   cd OpenSearchDashboards/plugins/bitergia-analytics-plugin
   yarn osd bootstrap
   ```

### Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/bitergia-analytics-plugin-0.2.0_2.6.0.zip`

### Run

To run and test the built version of plugin run inside **OpenSearch-Dashboards**
folder the following command:

```
yarn start
```

## API

Use the API to import and export the plugin's menu. You must use the
`osd-xsrf:true` header for all API calls and `Content-Type: application/json`
when you send a payload.

### Get menu

Returns the menu data in a JSON format.

```
 GET /_plugins/_bap/menu
```

##### Sample request

```
curl -X GET <OSD URL>/_plugins/_bap/menu --header 'osd-xsrf: true' --user '<USERNAME>:<PASSWORD>'
```

### Update menu

Updates the menu data or creates one if it does not exist.

```
 PUT /_plugins/_bap/menu
```

##### Sample request

```
curl -X PUT <OSD URL>/_plugins/_bap/menu \
--header 'osd-xsrf: true' \
--user '<USERNAME>:<PASSWORD>' \
--header 'Content-Type: application/json' \
-d '{
  "menu": [
    {
      "name": "Overview",
      "dashboard_id": "Overview",
      "type": "entry"
    },
    {
      "name": "About",
      "type": "menu",
      "dashboards": [
        {
          "name": "Contact",
          "type": "entry",
          "dashboard_id": "https://example.com"
        }
      ]
    }
  ]
}'
```

## Configuration

### Hide tenant selector

To hide or show the `Switch tenants` button on the user menu, add the configuration
property `bitergia_analytics.hideTenantSelector` to the `opensearch_dashboards.yml`
file and set the value to either `true` or `false`. The selector is hidden by
default.

## License

This project is licensed under Apache 2.0. See the [LICENSE](./LICENSE) file
for more information about it.


## Acknowledgments

Thanks to the great work of
[OpenDistro's Kibana Reports plugin](https://github.com/opendistro-for-elasticsearch/kibana-reports).
We took some of their files to create the skeleton of this plugin.
