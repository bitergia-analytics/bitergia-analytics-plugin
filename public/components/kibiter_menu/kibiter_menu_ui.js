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

export const getKibiterJSMenu = ($, projectname, items, columns, currentParent) => {
  let menu = `
<div class="kuiLocalNavRow theme-dark kibiterLocalNav">
  <div class="kuiLocalNavRow__section">
    <div class="kuiLocalBreadcrumbs">
      <div class="kuiLocalBreadcrumb">
        <a class="kuiLocalBreadcrumb__link projectName" id="kibiterProjectName">
          ` + projectname + `
        </a>
      </div>

    </div>
  </div>
  <div class="kuiLocalNavRow__section">
    <div class="kuiLocalMenu">`



  items.forEach(item => {
    menu += `<button class="" id="kibiterMenuItem` + item.name.replace(/[^a-zA-Z0-9]+/g, '') + `">
           <div class="kuiLocalMenuItem kibiterLocalMenuItem`
    if (currentParent === item) {
      menu += ` selected-kibiter-item`
    }
    menu += `">
             ` + item.name + `
           </div>
         </button>`
  });
  menu += `    </div>
  </div>
</div>
<div class="kuiLocalDropdown kibiterLocalDropdown" id="kibiterItemDropdown" style="display: none">
  <!-- Dropdown close button -->
  <div className="kuiLocalDropdownPanels">
    <div class="col-md-4" style="margin-top: 20px">
      <div class="kibiterLocalDropdownTitle" id="kibiterItemDropdownTitle"></div>

      <div class="kibiterLocalDropdownText" id="kibiterItemDropdownDescription">
      </div>
    </div>`


  for (let i = 0; i < columns; i++) {
    menu += `<div class="col-md-2">
    <div class="kibiterLocalDropdownTitle" id="kibiterDropdownTitle` + i + `"></div>
    <div>
      <ul class="list-unstyled" id="kibiterDrowpdownItems` + i + `">

      </ul>
    </div>
    </div>`
  }

  menu += `
  </div>
</div>
  `

  return menu
}

export const redirectToPanel = (name, panel_id) => {
  $("#kibiterItemDropdown").hide()
  if (name === "Contact") {
    window.location.replace(panel_id)
  } else {
    window.location.replace(window.location.href.split("app/")[0] + "app/dashboards#/view/" + panel_id)
  }
}

export const fillDropdownItems = (parent, dashboards) => {
  let menuPart = ""
  dashboards.forEach(item => {
    menuPart += `
      <li>
      <a id="kibiterDropdownItem`+ parent.name.replace(/[^a-zA-Z0-9]+/g, '') + item.panel_id.replace(/[^a-zA-Z0-9]+/g, '') + `" ng-mouseover="$root.showDescription(subitem)" ng-mouseleave="$root.hideDescription()" class="kuiLink submenuitem"
        tabindex="0" role="button">` + item.name + `</a>
    </li>`

  });
  return menuPart
}