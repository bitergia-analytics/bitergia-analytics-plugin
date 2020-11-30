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
    <div class="kibiterLocalDropdownTitle" style="height: 20px" id="kibiterDropdownTitle` + i + `"></div>
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

export const bitergiaText = (textColor) => {
  return `<span style="margin-top: 4px; margin-left: 6px; color: ${textColor}" class="euiBreadcrumb euiBreadcrumb--last" aria-current="page" data-test-subj="breadcrumb first" title="Bitergia Analytics">Bitergia Analytics</span>`
}

export const bitergiaSVGLogo = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="34"
   height="34"
   viewBox="0 0 271.3237 253.70652"
   version="1.1"
   id="svg8"
   inkscape:version="1.0.1 (0767f8302a, 2020-10-17)"
   sodipodi:docname="bitergia-background.svg"
   inkscape:export-filename="/home/anajs/Downloads/bitergia-blackbackground.png"
   inkscape:export-xdpi="96"
   inkscape:export-ydpi="96">
  <defs
     id="defs2">
    <linearGradient
       id="linearGradient2163"
       osb:paint="solid">
      <stop
         style="stop-color:#000000;stop-opacity:1;"
         offset="0"
         id="stop2161" />
    </linearGradient>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath885">
      <path
         d="M 0,773.961 H 935.953 V 0 H 0 Z"
         id="path883"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath893">
      <path
         d="m 280.046,422.861 h 4.436 v -4.436 h -4.436 z"
         id="path891"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath909">
      <path
         d="M 135.711,619.703 H 427.688 V 426.025 H 135.711 Z"
         id="path907"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath913">
      <path
         d="M 135.711,619.703 H 406.33 V 426.025 H 135.711 Z"
         id="path911"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath917">
      <path
         d="m 158.728,586.608 h 268.96 V 426.025 h -268.96 z"
         id="path915"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath953">
      <path
         d="m 152.122,441.211 h 10.843 v -10.843 h -10.843 z"
         id="path951"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath969">
      <path
         d="m 201.703,565.206 h 9.952 v -9.952 h -9.952 z"
         id="path967"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath985">
      <path
         d="m 411.63,477.06 h 8.469 v -8.054 h -8.469 z"
         id="path983"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1001">
      <path
         d="m 383.492,550.174 h 11.349 v -11.581 h -11.349 z"
         id="path999"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1017">
      <path
         d="m 392.201,557.38 h 3.304 v -3.37 h -3.304 z"
         id="path1015"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1033">
      <path
         d="m 134.696,541.172 h 10.493 v -10.807 h -10.493 z"
         id="path1031"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1049">
      <path
         d="m 142.042,500.601 h 6.94 v -7.148 h -6.94 z"
         id="path1047"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1065">
      <path
         d="m 169.541,476.028 h 6.022 V 470.3 h -6.022 z"
         id="path1063"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1081">
      <path
         d="m 212.274,574.423 h 13.464 v -13.465 h -13.464 z"
         id="path1079"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1097">
      <path
         d="m 396.747,580.623 h 16.739 v -16.739 h -16.739 z"
         id="path1095"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1113">
      <path
         d="m 391.806,589.727 h 7.845 v -7.845 h -7.845 z"
         id="path1111"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1129">
      <path
         d="m 260.795,634.824 h 16.743 v -16.742 h -16.743 z"
         id="path1127"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1145">
      <path
         d="m 280.606,637.787 h 7.845 v -7.845 h -7.845 z"
         id="path1143"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1161">
      <path
         d="m 337.038,635.639 h 11.754 v -11.178 h -11.754 z"
         id="path1159"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1177">
      <path
         d="m 421.976,537.367 h 7.857 v -7.473 h -7.857 z"
         id="path1175"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1193">
      <path
         d="m 222.066,604.659 h 5.397 v -5.132 h -5.397 z"
         id="path1191"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1209">
      <path
         d="m 154.296,598.108 h 11.302 V 587.36 h -11.302 z"
         id="path1207"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1257">
      <path
         d="M 173.307,579.72 H 379.85 V 462.919 H 173.307 Z"
         id="path1255"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1273">
      <path
         d="m 187.746,491.393 h 2.177 v -4.028 h -2.177 z"
         id="path1271"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1289">
      <path
         d="m 188.189,485.801 h 29.014 v -21.307 h -29.014 z"
         id="path1287"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1417">
      <path
         d="M 181.309,595.715 H 358.007 V 526.197 H 181.309 Z"
         id="path1415"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1545">
      <path
         d="m 370.397,538.593 h 9.549 V 528.33 h -9.549 z"
         id="path1543"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1581">
      <path
         d="M 376.768,461.933 H 388 v -33.696 h -11.232 z"
         id="path1579"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1597">
      <path
         d="m 358.809,461.933 h 11.756 v -33.12 h -11.756 z"
         id="path1595"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1617">
      <path
         d="m 338.704,489.466 h 68.578 v -17.737 h -68.578 z"
         id="path1615"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1641">
      <path
         d="m 369.28,462.853 h 0.715 v -0.42 h -0.715 z"
         id="path1639"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1657">
      <path
         d="m 374.889,463.382 h 1.762 v -1.077 h -1.762 z"
         id="path1655"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1673">
      <path
         d="m 368.067,469.324 h 9.818 v -6.784 h -9.818 z"
         id="path1671"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1745">
      <path
         d="m 201.956,445.192 h 55.719 v -18.515 h -55.719 z"
         id="path1743"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1761">
      <path
         d="m 278.153,446.59 h 44.402 v -19.841 h -44.402 z"
         id="path1759"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1789">
      <path
         d="m 519.172,599.41 h 261.78 V 426.744 h -261.78 z"
         id="path1787"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1793">
      <path
         d="m 519.172,599.41 h 241.26 V 426.744 h -241.26 z"
         id="path1791"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1797">
      <path
         d="m 539.692,569.906 h 241.26 V 426.744 h -241.26 z"
         id="path1795"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1833">
      <path
         d="m 551.701,447.449 h 9.666 v -9.667 h -9.666 z"
         id="path1831"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1849">
      <path
         d="m 584.437,547.903 h 8.873 v -8.872 h -8.873 z"
         id="path1847"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1865">
      <path
         d="m 786.991,468.311 h 5.307 v -5.048 h -5.307 z"
         id="path1863"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1881">
      <path
         d="m 711.542,543.151 h 13.915 v -13.233 h -13.915 z"
         id="path1879"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1897">
      <path
         d="m 733.6,545.077 h 4.05 v -3.851 h -4.05 z"
         id="path1895"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1913">
      <path
         d="m 502.857,527.361 h 9.655 v -9.182 h -9.655 z"
         id="path1911"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1929">
      <path
         d="m 507.684,498.325 h 6.386 v -6.073 h -6.386 z"
         id="path1927"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1945">
      <path
         d="m 553.362,473.492 h 5.369 v -5.106 h -5.369 z"
         id="path1943"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1961">
      <path
         d="m 574.737,565.541 h 14.565 v -14.566 h -14.565 z"
         id="path1959"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1977">
      <path
         d="m 763.056,572.686 h 14.923 v -14.923 h -14.923 z"
         id="path1975"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath1993">
      <path
         d="m 749.401,583.469 h 6.994 v -6.994 h -6.994 z"
         id="path1991"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2009">
      <path
         d="m 620.686,610.55 h 14.926 v -14.927 h -14.926 z"
         id="path2007"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2025">
      <path
         d="m 638.347,613.191 h 6.995 v -6.994 h -6.995 z"
         id="path2023"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2041">
      <path
         d="m 698.27,620.515 h 10.479 V 610.55 H 698.27 Z"
         id="path2039"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2057">
      <path
         d="m 795.229,513.827 h 6.029 v -5.733 h -6.029 z"
         id="path2055"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2073">
      <path
         d="m 599.059,593.332 h 11.398 v -10.84 h -11.398 z"
         id="path2071"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2089">
      <path
         d="m 553.008,587.283 h 10.075 v -9.582 h -10.075 z"
         id="path2087"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2105">
      <path
         d="m 615.215,565.225 h 4.436 v -4.436 h -4.436 z"
         id="path2103"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2129">
      <path
         d="M 588.856,458.552 H 732.207 V 446.784 H 588.856 Z"
         id="path2127"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2159">
      <path
         d="m 632.664,447.315 h 21.234 v -20.34 h -21.234 z"
         id="path2157"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2267">
      <path
         d="m 743.635,545.999 c 0,-14.366 11.641,-25.999 26.008,-25.999 v 0 c 14.356,0 25.998,11.633 25.998,25.999 v 0 c 0,14.356 -11.642,25.998 -25.998,25.998 v 0 c -14.367,0 -26.008,-11.642 -26.008,-25.998"
         id="path2265"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2283">
      <path
         d="m 758.765,567.113 h 18.867 v -7.528 h -18.867 z"
         id="path2281"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2299">
      <path
         d="m 777.632,563.8 h 4.794 v -3.256 h -4.794 z"
         id="path2297"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2331">
      <path
         d="m 746.375,537.407 h 19.004 v -22.321 h -19.004 z"
         id="path2329"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2347">
      <path
         d="m 773.906,537.407 h 18.995 v -22.321 h -18.995 z"
         id="path2345"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2431">
      <path
         d="M 0,773.961 H 935.953 V 0 H 0 Z"
         id="path2429"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2447">
      <path
         d="m 529.936,559.29 c 0,-15.08 12.22,-27.29 27.291,-27.29 v 0 c 15.069,0 27.289,12.21 27.289,27.29 v 0 c 0,15.07 -12.22,27.29 -27.289,27.29 v 0 c -15.071,0 -27.291,-12.22 -27.291,-27.29"
         id="path2445"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2467">
      <path
         d="m 532.352,548.084 h 19.454 v -15.33 h -19.454 z"
         id="path2465"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2483">
      <path
         d="m 562.893,548.084 h 19.353 v -15.33 h -19.353 z"
         id="path2481"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2503">
      <path
         d="m 543.167,580.745 h 24.479 v -15.086 h -24.479 z"
         id="path2501"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2551">
      <path
         d="m 522.883,470.007 c 0,-15.91 11.976,-28.917 27.876,-28.917 v 0 c 15.899,0 26.693,12.176 26.693,28.086 v 0 c 0,15.9 -9.852,26.494 -25.751,26.494 v 0 c -15.9,0 -28.818,-9.764 -28.818,-25.663"
         id="path2549"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2567">
      <path
         d="m 527.174,457.548 h 19.267 v -14.314 h -19.267 z"
         id="path2565"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2583">
      <path
         d="m 554.76,457.609 h 18.822 V 443.234 H 554.76 Z"
         id="path2581"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2623">
      <path
         d="m 531.226,488.749 h 13.127 v -34.113 h -13.127 z"
         id="path2621"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2647">
      <path
         d="m 539.944,484.988 h 3.272 v -5.804 h -3.272 z"
         id="path2645"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2663">
      <path
         d="m 542.261,489.104 h 20.898 v -31.38 h -20.898 z"
         id="path2661"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2715">
      <path
         d="m 744.574,467.082 c 0,-15.08 12.219,-25.992 27.288,-25.992 v 0 c 15.071,0 27.29,10.912 27.29,25.992 v 0 c 0,15.07 -12.219,27.29 -27.29,27.29 v 0 c -15.069,0 -27.288,-12.22 -27.288,-27.29"
         id="path2713"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2727">
      <path
         d="m 751.978,456.504 h 47.503 v -30.833 h -47.503 z"
         id="path2725"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2763">
      <path
         d="m 762.603,490.035 h 21.163 v -14.344 h -21.163 z"
         id="path2761"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2823">
      <path
         d="m 634.247,584.482 c 0,-13.916 11.285,-25.201 25.211,-25.201 v 0 c 13.917,0 27.358,11.288 27.358,25.206 v 0 c 0,13.927 -13.441,25.206 -27.358,25.206 v 0 c -13.926,0 -25.211,-11.285 -25.211,-25.211"
         id="path2821"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2835">
      <path
         d="m 664.816,575.672 h 16.123 v -12.704 h -16.123 z"
         id="path2833"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2851">
      <path
         d="m 639.59,575.672 h 16.038 V 562.968 H 639.59 Z"
         id="path2849"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2875">
      <path
         d="m 642.658,585.945 h 9.375 v -13.558 h -9.375 z"
         id="path2873"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2907">
      <path
         d="m 670.228,593.745 h 10.377 v -22.558 h -10.377 z"
         id="path2905"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2927">
      <path
         d="m 667.237,601.105 h 3.765 v -11.363 h -3.765 z"
         id="path2925"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2943">
      <path
         d="m 667.102,601.103 h 0.135 v -0.065 h -0.135 z"
         id="path2941"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath2959">
      <path
         d="m 644.392,606.301 h 23.232 v -21.755 h -23.232 z"
         id="path2957"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3011">
      <path
         d="m 673.946,584.447 h 2.706 v -10.804 h -2.706 z"
         id="path3009"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3027">
      <path
         d="m 669.211,581.294 h 2.025 v -6.063 h -2.025 z"
         id="path3025"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3043">
      <path
         d="m 645.733,582.336 h 3.651 v -7.861 h -3.651 z"
         id="path3041"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3059">
      <path
         d="m 650.811,579.963 h 1.722 V 575.5 h -1.722 z"
         id="path3057"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3075">
      <path
         d="m 650.718,604.221 h 14.123 v -10.508 h -14.123 z"
         id="path3073"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3091">
      <path
         d="m 666.393,599.583 h 2.609 v -5.381 h -2.609 z"
         id="path3089"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3107">
      <path
         d="M 0,773.961 H 935.953 V 0 H 0 Z"
         id="path3105"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3147">
      <path
         d="m 637.352,503.698 h 8.8 v -26.397 h -8.8 z"
         id="path3145"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3163">
      <path
         d="m 623.283,503.698 h 9.21 v -25.946 h -9.21 z"
         id="path3161"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3183">
      <path
         d="m 607.532,525.268 h 53.725 v -13.895 h -53.725 z"
         id="path3181"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3207">
      <path
         d="m 631.486,504.42 h 0.56 v -0.33 h -0.56 z"
         id="path3205"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3223">
      <path
         d="m 635.88,504.834 h 1.381 v -0.844 h -1.381 z"
         id="path3221"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3239">
      <path
         d="m 631.092,509.488 h 6.596 v -5.314 h -6.596 z"
         id="path3237"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3347">
      <path
         d="M 151.271,309.316 H 401.706 V 144.133 H 151.271 Z"
         id="path3345"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3351">
      <path
         d="M 151.271,309.316 H 382.075 V 144.133 H 151.271 Z"
         id="path3349"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3355">
      <path
         d="M 170.901,281.091 H 401.706 V 144.133 H 170.901 Z"
         id="path3353"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3391">
      <path
         d="m 174.811,178.073 h 9.248 v -9.248 h -9.248 z"
         id="path3389"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3407">
      <path
         d="m 223.547,255.048 h 7.145 v -7.145 h -7.145 z"
         id="path3405"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3423">
      <path
         d="m 407.482,183.899 h 5.078 v -4.829 h -5.078 z"
         id="path3421"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3439">
      <path
         d="m 398.139,258.148 h 13.312 v -12.66 h -13.312 z"
         id="path3437"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3455">
      <path
         d="m 389.786,261.833 h 3.874 v -3.685 h -3.874 z"
         id="path3453"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3471">
      <path
         d="m 137.63,248.922 h 7.484 v -7.117 h -7.484 z"
         id="path3469"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3487">
      <path
         d="m 139.005,215.517 h 6.109 v -5.81 h -6.109 z"
         id="path3485"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3503">
      <path
         d="m 158.149,168.825 h 5.136 v -4.884 h -5.136 z"
         id="path3501"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3519">
      <path
         d="m 224.494,270.22 h 11.729 v -11.729 h -11.729 z"
         id="path3517"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3535">
      <path
         d="m 399.04,234.696 h 14.276 V 220.42 H 399.04 Z"
         id="path3533"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3551">
      <path
         d="m 396.273,242.142 h 6.692 v -6.691 h -6.692 z"
         id="path3549"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3567">
      <path
         d="m 248.385,319.973 h 14.279 v -14.28 h -14.279 z"
         id="path3565"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3583">
      <path
         d="m 265.281,322.5 h 6.691 v -6.692 h -6.691 z"
         id="path3581"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3599">
      <path
         d="m 329.303,319.154 h 10.025 v -9.534 h -10.025 z"
         id="path3597"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3615">
      <path
         d="m 421.131,237.168 h 5.767 v -5.485 h -5.767 z"
         id="path3613"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3631">
      <path
         d="m 231.45,310.494 h 9.038 v -8.596 h -9.038 z"
         id="path3629"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3647">
      <path
         d="m 219.08,316.022 h 7.051 v -6.706 h -7.051 z"
         id="path3645"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3663">
      <path
         d="m 210.224,310.238 h 3.974 v -3.779 h -3.974 z"
         id="path3661"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3779">
      <path
         d="m 398.383,210.337 h 8.785 v -8.838 h -8.785 z"
         id="path3777"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3795">
      <path
         d="m 381.201,182.933 h 8.788 v -8.838 h -8.788 z"
         id="path3793"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3811">
      <path
         d="m 337.433,212.387 h 8.788 v -8.845 h -8.788 z"
         id="path3809"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3827">
      <path
         d="m 359.074,199.577 h 8.784 v -8.846 h -8.784 z"
         id="path3825"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3843">
      <path
         d="m 349.181,159.823 h 8.785 v -8.834 h -8.785 z"
         id="path3841"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3859">
      <path
         d="m 327.685,177.087 h 8.774 v -8.839 h -8.774 z"
         id="path3857"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3875">
      <path
         d="m 303.297,162.674 h 8.787 v -8.837 h -8.787 z"
         id="path3873"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3891">
      <path
         d="m 291.752,186.986 h 8.779 v -8.835 h -8.779 z"
         id="path3889"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3907">
      <path
         d="m 321.999,221.213 h 8.784 v -8.835 h -8.784 z"
         id="path3905"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3923">
      <path
         d="m 313.329,204.898 h 8.779 v -8.833 h -8.779 z"
         id="path3921"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3939">
      <path
         d="m 277.265,223.311 h 8.784 v -8.829 h -8.784 z"
         id="path3937"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3955">
      <path
         d="m 258.408,210.338 h 8.771 v -8.829 h -8.771 z"
         id="path3953"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3971">
      <path
         d="m 262.84,185.618 h 8.777 v -8.845 h -8.777 z"
         id="path3969"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3987">
      <path
         d="m 234.724,167.334 h 8.785 v -8.838 h -8.785 z"
         id="path3985"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4003">
      <path
         d="m 205.768,174.459 h 8.787 v -8.827 h -8.787 z"
         id="path4001"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4019">
      <path
         d="m 227.355,192.091 h 8.777 v -8.827 h -8.777 z"
         id="path4017"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4035">
      <path
         d="m 197.184,210.789 h 8.775 v -8.837 h -8.775 z"
         id="path4033"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4051">
      <path
         d="m 174.097,186.051 h 8.796 v -8.836 h -8.796 z"
         id="path4049"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4151">
      <path
         d="M 365.174,307.774 H 376.34 V 295.895 H 365.174 Z"
         id="path4149"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4175">
      <path
         d="m 375.424,281.718 h 11.724 v -4.549 h -11.724 z"
         id="path4173"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4191">
      <path
         d="m 386.957,282.805 h 10.205 v -19.202 h -10.205 z"
         id="path4189"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4211">
      <path
         d="M 337.717,271.57 H 364.18 V 253.237 H 337.717 Z"
         id="path4209"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4235">
      <path
         d="m 303.073,298.475 h 19.981 v -19.091 h -19.981 z"
         id="path4233"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4251">
      <path
         d="m 322.561,299.954 h 14.089 v -8.443 h -14.089 z"
         id="path4249"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4267">
      <path
         d="m 322.37,291.511 h 0.191 v -0.886 h -0.191 z"
         id="path4265"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4287">
      <path
         d="m 267.934,284.994 h 26.248 v -23.416 h -26.248 z"
         id="path4285"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4307">
      <path
         d="m 235.673,278.205 h 22.325 v -9.774 h -22.325 z"
         id="path4305"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4331">
      <path
         d="m 228.392,287.698 h 1.288 v -0.463 h -1.288 z"
         id="path4329"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4347">
      <path
         d="m 200.837,313.512 h 27.776 v -26.267 h -27.776 z"
         id="path4345"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4719">
      <path
         d="m 183.779,262.473 h 9.446 v -28.335 h -9.446 z"
         id="path4717"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4735">
      <path
         d="m 168.677,262.473 h 9.886 v -27.851 h -9.886 z"
         id="path4733"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4755">
      <path
         d="m 151.77,285.627 h 57.669 V 270.711 H 151.77 Z"
         id="path4753"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4779">
      <path
         d="m 177.483,263.248 h 0.601 v -0.354 h -0.601 z"
         id="path4777"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4795">
      <path
         d="m 182.199,263.692 h 1.482 v -0.905 h -1.482 z"
         id="path4793"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4811">
      <path
         d="m 176.463,268.688 h 8.256 v -5.704 h -8.256 z"
         id="path4809"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4883">
      <path
         d="M 529.658,305.822 H 775.039 V 143.973 H 529.658 Z"
         id="path4881"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4887">
      <path
         d="M 529.658,305.822 H 755.805 V 143.973 H 529.658 Z"
         id="path4885"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4891">
      <path
         d="M 548.893,278.166 H 775.039 V 143.973 H 548.893 Z"
         id="path4889"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4927">
      <path
         d="m 560.149,163.38 h 9.061 v -9.061 h -9.061 z"
         id="path4925"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4943">
      <path
         d="m 560.064,287.996 h 8.317 v -8.316 h -8.317 z"
         id="path4941"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4959">
      <path
         d="m 769.404,182.323 h 5.983 v -5.69 h -5.983 z"
         id="path4957"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4975">
      <path
         d="m 762.939,171.751 h 4.385 v -4.17 h -4.385 z"
         id="path4973"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4991">
      <path
         d="M 709.977,253.088 H 723.02 V 240.683 H 709.977 Z"
         id="path4989"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5007">
      <path
         d="m 730.653,254.893 h 3.796 v -3.611 h -3.796 z"
         id="path5005"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5023">
      <path
         d="m 514.365,238.287 h 9.05 v -8.608 h -9.05 z"
         id="path5021"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5039">
      <path
         d="m 518.89,211.07 h 5.986 v -5.693 h -5.986 z"
         id="path5037"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5055">
      <path
         d="m 561.706,187.792 h 5.033 v -4.786 h -5.033 z"
         id="path5053"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5071">
      <path
         d="m 572.702,300.412 h 13.653 v -13.653 h -13.653 z"
         id="path5069"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5087">
      <path
         d="M 775.761,249.349 H 789.75 V 235.361 H 775.761 Z"
         id="path5085"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5103">
      <path
         d="m 771.158,232.9 h 9.207 v -9.207 h -9.207 z"
         id="path5101"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5119">
      <path
         d="m 745.464,290.88 h 6.556 v -6.556 h -6.556 z"
         id="path5117"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5135">
      <path
         d="m 650.19,329.991 h 13.99 v -13.99 h -13.99 z"
         id="path5133"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5151">
      <path
         d="m 665.664,319.159 h 6.556 v -6.556 h -6.556 z"
         id="path5149"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5167">
      <path
         d="m 697.537,325.605 h 9.822 v -9.341 h -9.822 z"
         id="path5165"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5183">
      <path
         d="m 781.704,218.102 h 5.651 v -5.375 h -5.651 z"
         id="path5181"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5199">
      <path
         d="m 597.013,328.011 h 10.684 V 317.85 h -10.684 z"
         id="path5197"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5215">
      <path
         d="m 537.765,288.329 h 9.444 v -8.982 h -9.444 z"
         id="path5213"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5255">
      <path
         d="m 619.684,273.778 h 4.159 v -4.158 h -4.159 z"
         id="path5253"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5311">
      <path
         d="m 621.262,255.604 h 53.631 V 201.41 h -53.631 z"
         id="path5309"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5437">
      <path
         d="m 695.521,315.154 h 25.894 v -29.727 h -25.894 z"
         id="path5435"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5507">
      <path
         d="m 694.799,253.973 h 60.216 v -26.831 h -60.216 z"
         id="path5505"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5535">
      <path
         d="m 537.765,272.337 h 67.319 v -67.319 h -67.319 z"
         id="path5533"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5587">
      <path
         d="m 535.11,274.181 h 63.991 V 204.864 H 535.11 Z"
         id="path5585"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5611">
      <path
         d="m 566.232,192.213 h 12.643 v -42.628 h -12.643 z"
         id="path5609"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5655">
      <path
         d="m 730.953,176.298 h 10.07 V 146.09 h -10.07 z"
         id="path5653"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5671">
      <path
         d="m 714.853,176.298 h 10.539 v -29.692 h -10.539 z"
         id="path5669"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5691">
      <path
         d="m 696.828,200.982 h 61.481 v -15.901 h -61.481 z"
         id="path5689"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5715">
      <path
         d="m 724.24,177.124 h 0.641 v -0.377 h -0.641 z"
         id="path5713"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5731">
      <path
         d="m 729.269,177.598 h 1.579 v -0.965 h -1.579 z"
         id="path5729"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath5747">
      <path
         d="m 723.153,182.924 h 8.801 v -6.081 h -8.801 z"
         id="path5745"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3107-5">
      <path
         d="M 0,773.961 H 935.953 V 0 H 0 Z"
         id="path3105-7"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4719-4">
      <path
         d="m 183.779,262.473 h 9.446 v -28.335 h -9.446 z"
         id="path4717-1"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4735-8">
      <path
         d="m 168.677,262.473 h 9.886 v -27.851 h -9.886 z"
         id="path4733-5"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4755-9">
      <path
         d="m 151.77,285.627 h 57.669 V 270.711 H 151.77 Z"
         id="path4753-7"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4779-5">
      <path
         d="m 177.483,263.248 h 0.601 v -0.354 h -0.601 z"
         id="path4777-3"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4795-8">
      <path
         d="m 182.199,263.692 h 1.482 v -0.905 h -1.482 z"
         id="path4793-8"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4811-3">
      <path
         d="m 176.463,268.688 h 8.256 v -5.704 h -8.256 z"
         id="path4809-1"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath3107-4">
      <path
         d="M 0,773.961 H 935.953 V 0 H 0 Z"
         id="path3105-0"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4719-3">
      <path
         d="m 183.779,262.473 h 9.446 v -28.335 h -9.446 z"
         id="path4717-9"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4735-1">
      <path
         d="m 168.677,262.473 h 9.886 v -27.851 h -9.886 z"
         id="path4733-9"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4755-6">
      <path
         d="m 151.77,285.627 h 57.669 V 270.711 H 151.77 Z"
         id="path4753-9"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4779-3">
      <path
         d="m 177.483,263.248 h 0.601 v -0.354 h -0.601 z"
         id="path4777-38"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4795-0">
      <path
         d="m 182.199,263.692 h 1.482 v -0.905 h -1.482 z"
         id="path4793-5"
         inkscape:connector-curvature="0" />
    </clipPath>
    <clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath4811-6">
      <path
         d="m 176.463,268.688 h 8.256 v -5.704 h -8.256 z"
         id="path4809-6"
         inkscape:connector-curvature="0" />
    </clipPath>
  </defs>
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="0.35"
     inkscape:cx="-790.42735"
     inkscape:cy="729.55464"
     inkscape:document-units="mm"
     inkscape:current-layer="layer1"
     inkscape:document-rotation="0"
     showgrid="false"
     fit-margin-top="12.5"
     fit-margin-left="12.5"
     fit-margin-right="12.5"
     fit-margin-bottom="12.5"
     lock-margins="true"
     inkscape:window-width="2560"
     inkscape:window-height="1043"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(10.458947,14.623237)">
    <path
       style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:16.2607;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke markers fill"
       d="M 239.0708,-2.0729024 C 208.24631,6.1056398 177.48154,14.135184 146.50724,21.74234 137.95193,24.54749 130.76008,30.495085 125.07006,37.070458 118.44058,29.399619 109.98777,22.793219 99.663123,20.813996 70.091159,13.553728 40.745712,5.7482031 11.34709,-2.0941523 4.5537474,-2.6723377 3.486388,5.5058633 2.4131606,10.335964 0.21810986,21.660988 8.0260153,32.415567 18.156238,37.282953 c 6.147875,3.368268 12.829219,5.817362 19.727617,7.2504 -7.283674,17.288122 -2.641444,38.653124 11.841783,51.089931 6.657041,5.979986 14.956003,10.100286 23.701042,12.295066 -8.420774,14.20046 -8.655191,31.29361 -6.570531,47.11622 3.72932,19.85777 13.681467,38.07233 24.931928,54.80584 2.030353,3.83519 8.028746,7.52295 11.350043,2.99761 3.85859,-0.20368 6.1272,-7.00897 7.94419,-2.67627 2.40925,3.87403 9.58935,-0.8882 10.58608,3.91727 -1.30734,4.74791 3.97939,7.68295 8.22192,6.82256 4.95466,1.03575 8.24803,-3.49742 7.13939,-7.96296 0.27972,-1.88557 3.95704,-1.82368 4.37649,-0.0935 3.20873,3.59024 7.68236,0.86786 10.63564,-1.38688 7.23522,-1.08071 9.03707,-9.48566 12.55182,-14.57872 6.83193,-13.72192 14.73432,-27.15912 19.1963,-41.8407 4.40592,-15.73795 2.52285,-33.38296 -6.74054,-47.17287 11.03904,-3.08614 21.9103,-8.306677 28.64628,-17.722268 8.81386,-10.546402 11.63266,-24.77396 9.06444,-37.976003 -0.46225,-2.628468 -1.098,-5.241586 -2.10531,-7.726389 13.73767,-3.078426 29.49744,-9.255769 34.43707,-23.361919 2.62112,-7.521825 1.2345,-16.9248147 -4.53535,-22.6401469 -1.02169,-0.3558575 -2.39087,-0.580272 -3.48574,-0.5121047 z M 37.176739,22.11775 c 20.446474,5.746175 41.311962,10.028503 61.63694,16.144562 1.646591,0.533348 6.199361,2.437997 6.221701,2.94617 -28.032218,-8.477491 -56.954922,-13.605434 -84.645787,-22.96951 0.223834,-1.369723 7.413987,1.813376 10.197787,2.124441 2.196462,0.584781 4.392897,1.169559 6.589359,1.754337 z M 230.24802,17.567483 c -3.31871,3.273732 -8.87759,3.132719 -13.09294,4.827985 -19.19392,5.343273 -38.70017,9.681555 -57.80944,15.302563 -5.1266,2.194704 -2.20451,9.915024 3.05248,9.045288 11.02146,-0.336177 24.50369,5.807542 25.11528,17.868165 0.60355,12.980192 -14.26861,20.983255 -26.21958,19.242313 -11.09229,-0.508229 -23.02557,-9.977339 -20.60054,-21.657695 1.60331,-7.085258 8.32787,-11.302969 14.31083,-14.686375 4.34213,-3.654326 -0.73641,-10.216561 -5.68448,-8.057886 -2.23565,0.617215 -5.04672,1.962336 -1.37782,-0.10625 13.85572,-4.934615 28.55038,-7.270952 42.68729,-11.357962 13.21671,-3.397721 26.48966,-6.889173 39.61892,-10.420146 z M 82.095248,46.831153 c 11.051238,0.09149 24.041812,7.702196 22.925592,19.811801 C 103.84634,79.58842 88.393737,85.821312 76.570826,83.627129 66.706909,82.169296 56.284228,73.90562 58.045015,63.305335 59.514364,52.724406 71.984786,46.471696 82.095248,46.831153 Z m 42.522322,36.433319 c 1.83147,4.224322 5.8522,7.770759 9.29131,10.065251 -2.62225,4.009981 -5.71051,7.322147 -8.92611,10.820337 -3.19541,-3.72727 -6.66251,-7.351217 -9.108,-11.599487 3.80902,-2.123316 6.26113,-6.160884 8.7428,-9.286101 z m 32.17466,26.736348 c 7.26159,6.7412 12.34793,16.25489 12.30883,26.1782 -1.56658,-9.57436 -5.72216,-18.91837 -12.30883,-26.1782 z m -66.195748,1.93087 c -9.068236,20.75828 -6.494037,44.60447 1.933621,65.13319 -6.635269,-13.34286 -11.12359,-28.83918 -9.529876,-43.69082 0.287945,-7.65667 3.916262,-15.15286 7.596255,-21.44237 z"
       id="path4516" />
    <g
       id="g3103"
       clip-path="url(#clipPath3107)"
       transform="matrix(0.35277777,0,0,-0.35277777,-41.351645,253.37539)">
      <g
         id="g4709"
         transform="matrix(11.440285,0,0,11.908758,573.98616,423.35674)">
        <path
           d="M 0,0 C 0,0 7.774,-5.34 2.635,-15.947 -2.506,-26.556 -4.016,-27.566 -4.016,-27.566 H -14.054 C -28.521,-9.056 -18.169,0 -18.169,0 v 0.028 c 1.88,-0.056 3.959,0.285 6.208,1.268 l 2.877,-3.317 c 0.1,-0.1 0.271,-0.1 0.355,0 l 2.962,3.317 C -3.702,0.398 -1.766,0.028 0,0.015 Z"
           style="fill:#09060a;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4711"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4713"
         transform="matrix(11.440285,0,0,11.908758,-1593.424,-2692.9593)">
        <g
           id="g4715" />
        <g
           id="g4727">
          <g
             clip-path="url(#clipPath4719)"
             id="g4725"
             style="opacity:0.460007">
            <g
               transform="translate(191.4679,245.7569)"
               id="g4723">
              <path
                 d="m 0,0 c -5.14,-10.608 -6.649,-11.619 -6.649,-11.619 h -1.039 c 1.039,1.638 2.648,4.499 5.083,9.525 5.14,10.609 -2.022,16.219 -2.022,16.219 l -0.356,0.384 -2.065,2.207 c 1.567,-0.513 3.032,-0.74 4.414,-0.754 v -0.015 c 0,0 7.775,-5.34 2.634,-15.947"
                 style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                 id="path4721"
                 inkscape:connector-curvature="0" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g4729"
         transform="matrix(11.440285,0,0,11.908758,-1593.424,-2692.9593)">
        <g
           id="g4731" />
        <g
           id="g4743">
          <g
             clip-path="url(#clipPath4735)"
             id="g4741"
             style="opacity:0.460007">
            <g
               transform="translate(178.5636,234.6222)"
               id="g4739">
              <path
                 d="m 0,0 h -2.179 c -14.467,18.524 -4.13,27.566 -4.13,27.566 v 0.029 c 0.941,-0.029 1.923,0.043 2.949,0.256 C -5.098,25.872 -12.188,16.075 0,0"
                 style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                 id="path4737"
                 inkscape:connector-curvature="0" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g4745"
         transform="matrix(11.440285,0,0,11.908758,798.79241,704.67855)">
        <path
           d="m 0,0 c 0,0 3.203,-5.753 -10.152,-7.533 0,0 0.113,-0.128 0.312,-0.356 3.717,-4.513 2.207,-11.348 -2.99,-14.04 -1.808,-0.939 -4.129,-1.708 -6.82,-1.679 -1.766,0.013 -3.703,0.383 -5.767,1.281 l 0.982,1.097 c 0.128,0.142 0.029,0.37 -0.17,0.383 -0.94,0.03 -2.905,0.571 -3.731,4.23 h -0.214 c 0,0 -1.651,-4.029 -3.887,-4.215 -0.185,-0.015 -0.256,-0.242 -0.142,-0.385 l 0.968,-1.11 c -2.249,-0.983 -4.328,-1.324 -6.208,-1.268 -2.506,0.043 -4.657,0.783 -6.365,1.666 -5.197,2.692 -6.707,9.527 -2.976,14.04 0.185,0.228 0.3,0.356 0.3,0.356 C -60.203,-5.753 -56.999,0 -56.999,0 c 0,0 16.959,-4.571 21.529,-5.454 3.845,-0.755 6.152,-4.328 6.792,-5.425 0.072,-0.142 0.271,-0.142 0.357,0 0.626,1.097 2.932,4.67 6.777,5.425 C -16.974,-4.571 0,0 0,0"
           style="fill:#09060a;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4747"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4749"
         transform="matrix(11.440285,0,0,11.908758,-1593.424,-2692.9593)">
        <g
           id="g4751" />
        <g
           id="g4763">
          <g
             clip-path="url(#clipPath4755)"
             id="g4761"
             style="opacity:0.460007">
            <g
               transform="translate(208.2501,281.4688)"
               id="g4759">
              <path
                 d="m 0,0 c -3.503,-0.939 -16.731,-4.442 -20.689,-5.212 -3.845,-0.768 -6.152,-4.328 -6.779,-5.438 -0.085,-0.143 -0.284,-0.143 -0.355,0 -0.641,1.11 -2.948,4.67 -6.792,5.438 -3.959,0.77 -17.187,4.273 -20.675,5.212 -2.023,2.05 -0.855,4.157 -0.855,4.157 0,0 16.958,-4.585 21.53,-5.468 3.844,-0.753 6.151,-4.313 6.792,-5.41 0.071,-0.142 0.27,-0.142 0.355,0 0.627,1.097 2.934,4.657 6.779,5.41 4.57,0.883 21.543,5.468 21.543,5.468 C 0.854,4.157 2.021,2.05 0,0"
                 style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                 id="path4757"
                 inkscape:connector-curvature="0" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g4765"
         transform="matrix(11.440285,0,0,11.908758,479.9951,453.88485)">
        <path
           d="m 0,0 c 0.84,-0.513 1.652,-0.94 2.449,-1.268 l -2.962,-3.317 c -0.085,-0.1 -0.256,-0.1 -0.355,0 l -2.877,3.317 C -2.947,-0.94 -2.121,-0.513 -1.281,0 -0.883,0.242 -0.384,0.242 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4767"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4769"
         transform="matrix(11.440285,0,0,11.908758,508.0146,438.78931)">
        <path
           d="M 0,0 C -0.797,0.327 -1.609,0.755 -2.449,1.268 -2.833,1.51 -3.332,1.51 -3.73,1.268 -4.57,0.755 -5.396,0.327 -6.194,0 l -0.968,1.11 c -0.114,0.143 -0.043,0.37 0.142,0.385 2.236,0.186 3.887,4.215 3.887,4.215 h 0.214 C -2.093,2.051 -0.128,1.51 0.812,1.48 1.011,1.467 1.11,1.239 0.982,1.097 Z"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4771"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4773"
         transform="matrix(11.440285,0,0,11.908758,-1593.424,-2692.9593)">
        <g
           id="g4775" />
        <g
           id="g4787">
          <g
             clip-path="url(#clipPath4779)"
             id="g4785"
             style="opacity:0.179993">
            <g
               transform="translate(177.4826,262.9845)"
               id="g4783">
              <path
                 d="M 0,0 C 0.198,0.082 0.403,0.173 0.602,0.263 0.429,0.123 0.256,0 0.074,-0.091 Z"
                 style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
                 id="path4781"
                 inkscape:connector-curvature="0" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g4789"
         transform="matrix(11.440285,0,0,11.908758,-1593.424,-2692.9593)">
        <g
           id="g4791" />
        <g
           id="g4803">
          <g
             clip-path="url(#clipPath4795)"
             id="g4801"
             style="opacity:0.179993">
            <g
               transform="translate(183.6808,262.9845)"
               id="g4799">
              <path
                 d="M 0,0 -0.173,-0.198 C -0.584,-0.041 -1.045,0.23 -1.481,0.708 -0.979,0.436 -0.485,0.197 0,0"
                 style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none"
                 id="path4797"
                 inkscape:connector-curvature="0" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g4805"
         transform="matrix(11.440285,0,0,11.908758,-1593.424,-2692.9593)">
        <g
           id="g4807" />
        <g
           id="g4819">
          <g
             clip-path="url(#clipPath4811)"
             id="g4817"
             style="opacity:0.460007">
            <g
               transform="translate(184.6603,264.0792)"
               id="g4815">
              <path
                 d="m 0,0 -0.979,-1.095 c -0.486,0.198 -0.98,0.436 -1.482,0.708 -0.568,0.625 -1.111,1.605 -1.448,3.119 h -0.215 c 0,0 -0.98,-2.378 -2.444,-3.555 l -0.008,-0.009 c -0.198,-0.09 -0.403,-0.181 -0.602,-0.263 l -0.963,1.112 c -0.115,0.139 -0.048,0.37 0.14,0.378 2.231,0.189 3.886,4.214 3.886,4.214 h 0.214 C -3.078,0.954 -1.111,0.411 -0.173,0.387 0.025,0.37 0.132,0.14 0,0"
                 style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                 id="path4813"
                 inkscape:connector-curvature="0" />
            </g>
          </g>
        </g>
      </g>
      <g
         id="g4821"
         transform="matrix(11.440285,0,0,11.908758,508.0146,438.78931)">
        <path
           d="m 0,0 c 2.064,-0.897 4.001,-1.268 5.767,-1.281 2.691,-0.029 5.012,0.74 6.82,1.679 5.197,2.692 6.707,9.527 2.99,14.04 -0.199,0.228 0,0 0,0 13.357,1.78 9.84,7.889 9.84,7.889 0,0 -16.974,-4.571 -21.544,-5.454 -3.845,-0.755 -6.151,-4.328 -6.777,-5.425 -0.086,-0.142 -0.285,-0.142 -0.357,0 -0.64,1.097 -2.947,4.67 -6.792,5.425 -4.57,0.883 -21.529,5.454 -21.529,5.454 0,0 -3.503,-6.109 9.839,-7.889 0,0 0.185,0.228 0,0 -3.731,-4.513 -2.221,-11.348 2.976,-14.04 1.708,-0.882 3.859,-1.623 6.365,-1.666 1.88,-0.056 3.959,0.286 6.208,1.268"
           style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
           id="path4823"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4825"
         transform="matrix(11.440285,0,0,11.908758,366.12881,423.35674)">
        <path
           d="m 0,0 c 0,0 -10.352,-9.056 4.115,-27.566 h 10.038 c 0,0 1.51,1.01 6.651,11.619 C 25.943,-5.34 18.169,0 18.169,0"
           style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
           id="path4827"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4829"
         transform="matrix(11.440285,0,0,11.908758,436.12271,93.749735)">
        <path
           d="m 0,0 c 0,-0.825 -0.779,-1.495 -1.741,-1.495 -0.961,0 -1.74,0.67 -1.74,1.495 0,0.826 0.779,1.495 1.74,1.495 C -0.779,1.495 0,0.826 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4831"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4833"
         transform="matrix(11.440285,0,0,11.908758,475.95095,93.749735)">
        <path
           d="m 0,0 c 0,-0.825 -0.779,-1.495 -1.74,-1.495 -0.962,0 -1.741,0.67 -1.741,1.495 0,0.826 0.779,1.495 1.741,1.495 C -0.779,1.495 0,0.826 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4835"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4837"
         transform="matrix(11.440285,0,0,12.214258,396.29336,94.618418)">
        <path
           d="m 0,0 c 0,-0.825 -0.78,-1.495 -1.741,-1.495 -0.962,0 -1.741,0.67 -1.741,1.495 0,0.825 0.779,1.495 1.741,1.495 C -0.78,1.495 0,0.825 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4839"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4841"
         transform="matrix(11.440285,0,0,11.908758,571.30499,94.586399)">
        <path
           d="m 0,0 c 0,-0.825 -0.78,-1.494 -1.741,-1.494 -0.962,0 -1.741,0.669 -1.741,1.494 0,0.826 0.779,1.495 1.741,1.495 C -0.78,1.495 0,0.826 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4843"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4845"
         transform="matrix(11.440285,0,0,12.21436,609.63323,95.629525)">
        <path
           d="m 0,0 c 0,-0.825 -0.779,-1.494 -1.741,-1.494 -0.961,0 -1.74,0.669 -1.74,1.494 0,0.826 0.779,1.495 1.74,1.495 C -0.779,1.495 0,0.826 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4847"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4849"
         transform="matrix(11.440285,0,0,11.908758,532.96534,94.413006)">
        <path
           d="m 0,0 c 0,-0.825 -0.779,-1.495 -1.741,-1.495 -0.961,0 -1.74,0.67 -1.74,1.495 0,0.825 0.779,1.495 1.74,1.495 C -0.779,1.495 0,0.825 0,0"
           style="fill:#ff7700;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4851"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4853"
         transform="matrix(11.440285,0,0,11.908758,428.30214,530.87262)">
        <path
           d="m 0,0 c 0,-3.145 -3.177,-5.693 -7.095,-5.693 -3.918,0 -7.094,2.548 -7.094,5.693 0,3.145 3.176,5.693 7.094,5.693 C -3.177,5.693 0,3.145 0,0"
           style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4855"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4857"
         transform="matrix(11.440285,0,0,11.908758,406.00158,531.86101)">
        <path
           d="m 0,0 c 0,-2.458 -2.179,-4.45 -4.865,-4.45 -2.688,0 -4.865,1.992 -4.865,4.45 0,2.457 2.177,4.449 4.865,4.449 C -2.179,4.449 0,2.457 0,0"
           style="fill:#09060a;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4859"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4861"
         transform="matrix(11.440285,0,0,11.908758,357.96155,536.69952)">
        <path
           d="m 0,0 c 0,-1.239 -0.877,-2.244 -1.96,-2.244 -1.082,0 -1.96,1.005 -1.96,2.244 0,1.24 0.878,2.245 1.96,2.245 C -0.877,2.245 0,1.24 0,0"
           style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4863"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4865"
         transform="matrix(11.440285,0,0,11.908758,665.7659,530.87262)">
        <path
           d="m 0,0 c 0,-3.145 -3.176,-5.693 -7.094,-5.693 -3.918,0 -7.094,2.548 -7.094,5.693 0,3.145 3.176,5.693 7.094,5.693 C -3.176,5.693 0,3.145 0,0"
           style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4867"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4869"
         transform="matrix(11.440285,0,0,11.908758,642.37166,538.29296)">
        <path
           d="m 0,0 c 0,-2.458 -2.178,-4.45 -4.864,-4.45 -2.688,0 -4.865,1.992 -4.865,4.45 0,2.457 2.177,4.449 4.865,4.449 C -2.178,4.449 0,2.457 0,0"
           style="fill:#09060a;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4871"
           inkscape:connector-curvature="0" />
      </g>
      <g
         id="g4873"
         transform="matrix(11.440285,0,0,11.908758,595.43672,536.69952)">
        <path
           d="m 0,0 c 0,-1.239 -0.878,-2.244 -1.96,-2.244 -1.082,0 -1.96,1.005 -1.96,2.244 0,1.24 0.878,2.245 1.96,2.245 C -0.878,2.245 0,1.24 0,0"
           style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
           id="path4875"
           inkscape:connector-curvature="0" />
      </g>
    </g>
  </g>
</svg>
`