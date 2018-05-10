import Vue from 'vue'

import bAlert from 'bootstrap-vue/es/components/alert/alert'
// import bBadge from 'bootstrap-vue/es/components/badge/badge'
import bButton from 'bootstrap-vue/es/components/button/button'
import bButtonClose from 'bootstrap-vue/es/components/button/button-close'
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group'
import bButtonToolbar from 'bootstrap-vue/es/components/button-toolbar/button-toolbar'
import bCard from 'bootstrap-vue/es/components/card/card'
import bCardHeader from 'bootstrap-vue/es/components/card/card-header'
import bCardBody from 'bootstrap-vue/es/components/card/card-body'
import bCardGroup from 'bootstrap-vue/es/components/card/card-group'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bRow from 'bootstrap-vue/es/components/layout/row'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown'
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import bForm from 'bootstrap-vue/es/components/form/form'
import bFormInvalidFeedback from 'bootstrap-vue/es/components/form/form-invalid-feedback'
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bInputGroupAppend from 'bootstrap-vue/es/components/input-group/input-group-append'
import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group'
import bLink from 'bootstrap-vue/es/components/link/link'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bNav from 'bootstrap-vue/es/components/nav/nav'
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item'
import bNavItemDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown'
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand'
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav'
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle'
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group'
import bListGroupItem from 'bootstrap-vue/es/components/list-group/list-group-item'
import bPopover from 'bootstrap-vue/es/components/popover/popover'
import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip'
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb'
import bBreadcrumbItem from 'bootstrap-vue/es/components/breadcrumb/breadcrumb-item'
import bBreadcrumbLink from 'bootstrap-vue/es/components/breadcrumb/breadcrumb-link'

import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
import vBModal from 'bootstrap-vue/es/directives/modal/modal'
import vBPopover from 'bootstrap-vue/es/directives/popover/popover'
import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'

Vue.component('b-alert', bAlert)
// Vue.component('b-badge', bBadge)
Vue.component('b-button', bButton)
Vue.component('b-button-close', bButtonClose)
Vue.component('b-button-group', bButtonGroup)
Vue.component('b-button-toolbar', bButtonToolbar)
Vue.component('b-card', bCard)
Vue.component('b-card-header', bCardHeader)
Vue.component('b-card-body', bCardBody)
Vue.component('b-card-group', bCardGroup)
Vue.component('b-collapse', bCollapse)
Vue.component('b-dropdown', bDropdown)
Vue.component('b-dropdown-item', bDropdownItem)
Vue.component('b-form', bForm)
Vue.component('b-form-invalid-feedback', bFormInvalidFeedback)
Vue.component('b-form-group', bFormGroup)
Vue.component('b-form-input', bFormInput)
Vue.component('b-form-checkbox', bFormCheckbox)
Vue.component('b-form-checkbox-group', bFormCheckboxGroup)
Vue.component('b-container', bContainer)
Vue.component('b-row', bRow)
Vue.component('b-col', bCol)
Vue.component('b-link', bLink)
Vue.component('b-nav', bNav)
Vue.component('b-nav-item', bNavItem)
Vue.component('b-nav-item-dropdown', bNavItemDropdown)
Vue.component('b-navbar', bNavbar)
Vue.component('b-navbar-brand', bNavbarBrand)
Vue.component('b-navbar-nav', bNavbarNav)
Vue.component('b-navbar-toggle', bNavbarToggle)
Vue.component('b-modal', bModal)
Vue.component('b-list-group', bListGroup)
Vue.component('b-list-group-item', bListGroupItem)
Vue.component('b-popover', bPopover)
Vue.component('b-tooltip', bTooltip)
Vue.component('b-breadcrumb', bBreadcrumb)
Vue.component('b-breadcrumb-item', bBreadcrumbItem)
Vue.component('b-breadcrumb-link', bBreadcrumbLink)
Vue.component('b-input-group', bInputGroup)
Vue.component('b-input-group-append', bInputGroupAppend)

// directives
Vue.directive('b-toggle', vBToggle)
Vue.directive('b-modal', vBModal)
Vue.directive('b-popover', vBPopover)
Vue.directive('b-tooltip', vBTooltip)
