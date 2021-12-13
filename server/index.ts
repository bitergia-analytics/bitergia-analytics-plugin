/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { schema } from '@osd/config-schema';
import { PluginInitializerContext } from '../../../src/core/server';
import { BitergiaAnalyticsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export const config = {
  exposeToBrowser: {
    branding: true
  },
  schema: schema.object({
    branding: schema.object({
      backgroundColor: schema.string({ defaultValue: '#333' }),
      textColor: schema.string({ defaultValue: '#cecece' }),
      menuItemColor: schema.string({ defaultValue: '#dedede' }),
      linkColor: schema.string({ defaultValue: '#fcb42e' }),
      selectedItemColor: schema.string({ defaultValue: '#f49e42' }),
    }),
  })
};

export function plugin(initializerContext: PluginInitializerContext) {
  return new BitergiaAnalyticsPlugin(initializerContext);
}

export {
  BitergiaAnalyticsPluginSetup,
  BitergiaAnalyticsPluginStart
} from './types';
