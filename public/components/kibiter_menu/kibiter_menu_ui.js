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

export const getKibiterMenu = () => {
  return `
<div class="kuiLocalNavRow theme-dark kibiterLocalNav">
  <div class="kuiLocalNavRow__section">
    <div class="kuiLocalBreadcrumbs">
      <div class="kuiLocalBreadcrumb">
        <a ng-show="$root.appTitleCustom" class="kuiLocalBreadcrumb__link projectName" ng-click="$root.redirectToPanel('Overview')">
          {{$root.appTitleCustom}}
        </a>
      </div>

    </div>
  </div>

  <div class="kuiLocalNavRow__section">
    <div class="kuiLocalMenu">
      <button class="" ng-class="{ 'selected-kibiter-item': item == $root.selectedItem }"
        ng-click="$root.showInfo(item)" ng-repeat="item in $root.metadash">
        <div class="selected-kibiter-item kuiLocalMenuItem kibiterLocalMenuItem" ng-if="item == $root.selectedItem">
          {{item.name}}
        </div>
        <div class="kuiLocalMenuItem kibiterLocalMenuItem" ng-if="item != $root.selectedItem">
          {{item.name}}
        </div>
      </button>
    </div>
  </div>
</div>
<div class="kuiLocalDropdown kibiterLocalDropdown" ng-if="$root.showKibiterMenu">
  <!-- Dropdown close button -->
  <div className="kuiLocalDropdownPanels">
    <div class="col-md-4" style="margin-top: 20px">
      <div class="kibiterLocalDropdownTitle" ng-show="$root.showDescriptionDiv">{{ $root.descriptionTitle }}</div>

      <div class="kibiterLocalDropdownText" ng-show="$root.showDescriptionDiv">
        {{ $root.descriptionContent }}
      </div>
    </div>
    <div class="col-md-2" ng-repeat="(i, column) in $root.currentPanelsons track by $index">
      <div class="kibiterLocalDropdownTitle" ng-if="i === 0">{{$root.parentDashboard.title}}</div>
      <div style="height: 25px" ng-if="i !== 0"></div>
      <div>
        <ul class="list-unstyled">
          <li ng-repeat="subitem in $root.currentPanelsons[i]" class="ng-scope">
            <a ng-mouseover="$root.showDescription(subitem)" ng-mouseleave="$root.hideDescription()" class="kuiLink submenuitem"
              tabindex="0" role="button" ng-click="$root.redirectToPanel(subitem.name, subitem.panel_id)">{{subitem.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  `
}
