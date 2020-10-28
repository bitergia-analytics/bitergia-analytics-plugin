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

/* eslint-disable no-restricted-globals */
import $ from 'jquery';
import { getKibiterMenu, getKibiterJSMenu, fillDropdownItems, redirectToPanel } from './kibiter_menu_ui';
import './kibiter_menu_style.scss';

async function getProjectName() {
  const url = window.location.href.split("/app/")
  const response = await fetch(url[0] + '/api/kibiter/getprojectname', {
    method: 'GET',
    referrerPolicy: 'strict-origin-when-cross-origin',
    mode: 'cors',
    credentials: 'include',
  })
  const json = await response.json();
  return json
}

async function getMetadashboard() {
  const url = window.location.href.split("/app/")
  const response = await fetch(url[0] + '/api/kibiter/getmetadashboard', {
    method: 'GET',
    referrerPolicy: 'strict-origin-when-cross-origin',
    mode: 'cors',
    credentials: 'include',
  })
  const json = await response.json();
  return json
}

function getCurrentDashboard(metadash) {
  let currentParent = undefined;
  // Check if you are in dashboard section
  if (window.location.href.split("dashboards#/view/")[1]) {
    let currentDash = window.location.href.split("dashboards#/view/")[1].split('?')[0]
    metadash.some((item) => {
      if (item.type === "entry" && item.panel_id === currentDash) {
        currentParent = item;
      } else if (item.type === "menu") {
        item.dashboards.some((subitem) => {
          if (subitem.type === "entry" && subitem.panel_id === currentDash) {
            currentParent = item
            return true
          }
        })
      }
      if (currentParent) {
        return true
      }
    });
  }
  return currentParent
}


function chunkify(a, n, balanced) {
  if (n < 2)
    return [a];

  let len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, i += size));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0)
      size--;
    while (i < size * n) {
      out.push(a.slice(i, i += size));
    }
    out.push(a.slice(size * n));
  }

  return out;
}

async function locationHashChanged() {

  const url = window.location.href.split("/app/")
  const projectname = await getProjectName()
  const metadashboard = await getMetadashboard()
  const currentDashboard = getCurrentDashboard(metadashboard.data.metadashboard)
  const columns = 4;

  const observer = new MutationObserver(async function (mutations) {
    const navBarMenu = document.querySelectorAll(
      '.chrHeaderWrapper'
    )

    if (navBarMenu && navBarMenu.length) {
      try {
        if ($('#kibiterjsmenu').length) {
          $(".selected-kibiter-item").removeClass("selected-kibiter-item")
          if(currentDashboard){
            $("#kibiterMenuItem" + currentDashboard.name.replace(/[^a-zA-Z0-9]+/g, '') + " div").addClass("selected-kibiter-item")
          }
          return;
        }
        const kibiterJSMenuItem = document.createElement('div');
        kibiterJSMenuItem.setAttribute("id", "kibiterjsmenu");

        kibiterJSMenuItem.innerHTML = getKibiterJSMenu($, projectname.data.projectname.name, metadashboard.data.metadashboard, columns, currentDashboard);
        navBarMenu[0].insertBefore(kibiterJSMenuItem, navBarMenu[0].firstChild)

        // Redirect to overview when clicking on project name
        $('#kibiterProjectName').click(function () {
          redirectToPanel('', 'Overview')
        });

        // Click feature
        metadashboard.data.metadashboard.forEach(item => {
          $('#kibiterMenuItem' + item.name.replace(/[^a-zA-Z0-9]+/g, '')).click(function () {
            if (item.type === "entry") {
              redirectToPanel(item.name, item.panel_id)
            } else if (item.type === "menu") {
              if ($("#kibiterDropdownTitle0").text() === item.name) {
                $("#kibiterItemDropdown").hide()
                $("#kibiterDropdownTitle0").text("")
                for (let i = 0; i < columns; i++) {
                  $("#kibiterDrowpdownItems" + i).html("")
                }
              } else {
                $("#kibiterItemDropdown").show()
                $("#kibiterDropdownTitle0").text(item.name)
                let groups = chunkify(item.dashboards, 4, true)
                for (let i = 0; i < columns; i++) {
                  if (groups[i]) {
                    $("#kibiterDrowpdownItems" + i).html(fillDropdownItems(item, groups[i]))
                  } else {
                    $("#kibiterDrowpdownItems" + i).html("")
                  }
                }
              }
              console.log(item)
            }
          });

          // Logic click for sons
          if (item.type === "menu") {
            item.dashboards.forEach(subitem => {
              // Redirect to panel
              $(document).on('click', '#kibiterDropdownItem' + item.name.replace(/[^a-zA-Z0-9]+/g, '') + subitem.panel_id.replace(/[^a-zA-Z0-9]+/g, ''), function () {
                redirectToPanel(subitem.name, subitem.panel_id)
              });
              $(document).on('mouseenter', '#kibiterDropdownItem' + item.name.replace(/[^a-zA-Z0-9]+/g, '') + subitem.panel_id.replace(/[^a-zA-Z0-9]+/g, ''), function () {
                $("#kibiterItemDropdownDescription").html(subitem.description)
                $("#kibiterItemDropdownTitle").html(subitem.title)
              });
              $(document).on('mouseleave', '#kibiterDropdownItem' + item.name.replace(/[^a-zA-Z0-9]+/g, '') + subitem.panel_id.replace(/[^a-zA-Z0-9]+/g, ''), function () {
                $("#kibiterItemDropdownDescription").html("")
                $("#kibiterItemDropdownTitle").html("")
              });
            })
          }

        });
      } catch (e) {
        return e
      } finally {
        observer.disconnect();
      }
    }
  });

  // Start observing
  observer.observe(document.body, {
    //document.body is node target to observe
    childList: true, //This is a must have for the observer with subtree
    subtree: true, //Set to true if changes must also be observed in descendants.
  });
}

history.pushState = (f => function pushState() {
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = (f => function replaceState() {
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate', () => {
  window.dispatchEvent(new Event('locationchange'))
});

window.addEventListener('locationchange', function () {
  locationHashChanged();
})

locationHashChanged();