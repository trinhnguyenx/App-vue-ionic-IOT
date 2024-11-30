import {
  script
} from "./chunk-IVPXFQ63.js";
import {
  BaseStyle
} from "./chunk-R5DHDY7V.js";
import {
  isEmpty
} from "./chunk-5KY5SIIS.js";
import {
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-GI7C4HJS.js";
import "./chunk-AMBSP7Z4.js";

// node_modules/.pnpm/primevue@4.0.2_vue@3.4.31_typescript@5.5.3_/node_modules/primevue/inputgroup/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-inputgroup {\n    display: flex;\n    align-items: stretch;\n    width: 100%;\n}\n\n.p-inputgroupaddon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0.5rem;\n    background: ".concat(dt("inputgroup.addon.background"), ";\n    color: ").concat(dt("inputgroup.addon.color"), ";\n    border-top: 1px solid ").concat(dt("inputgroup.addon.border.color"), ";\n    border-left: 1px solid ").concat(dt("inputgroup.addon.border.color"), ";\n    border-bottom: 1px solid ").concat(dt("inputgroup.addon.border.color"), ";\n    padding: 0.5rem 0.75rem;\n    min-width: 2.5rem;\n}\n\n.p-inputgroup .p-floatlabel {\n    display: flex;\n    align-items: stretch;\n    width: 100%;\n}\n\n.p-inputgroup .p-inputtext,\n.p-inputgroup-fluid .p-inputtext,\n.p-inputgroup .p-inputwrapper,\n.p-inputgroup-fluid .p-input {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n.p-inputgroupaddon:last-child {\n    border-right: 1px solid ").concat(dt("inputgroup.addon.border.color"), ";\n}\n\n.p-inputgroup > .p-component,\n.p-inputgroup > .p-inputwrapper > .p-inputtext,\n.p-inputgroup > .p-floatlabel > .p-component {\n    border-radius: 0;\n    margin: 0;\n}\n\n.p-inputgroup > .p-component + .p-inputgroupaddon,\n.p-inputgroup > .p-inputwrapper > .p-inputtext + .p-inputgroupaddon,\n.p-inputgroup > .p-floatlabel > .p-component + .p-inputgroupaddon {\n    border-left: 0 none;\n}\n\n.p-inputgroup > .p-component:focus,\n.p-inputgroup > .p-inputwrapper > .p-inputtext:focus,\n.p-inputgroup > .p-floatlabel > .p-component:focus {\n    z-index: 1;\n}\n\n.p-inputgroup > .p-component:focus ~ label,\n.p-inputgroup > .p-inputwrapper > .p-inputtext:focus~label,\n.p-inputgroup > .p-floatlabel > .p-component:focus~label {\n    z-index: 1;\n}\n\n.p-inputgroupaddon:first-child,\n.p-inputgroup button:first-child,\n.p-inputgroup input:first-child,\n.p-inputgroup > .p-inputwrapper:first-child,\n.p-inputgroup > .p-inputwrapper:first-child > .p-inputtext {\n    border-top-left-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n    border-bottom-left-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n}\n\n.p-inputgroup .p-floatlabel:first-child input {\n    border-top-left-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n    border-bottom-left-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n}\n\n.p-inputgroupaddon:last-child,\n.p-inputgroup button:last-child,\n.p-inputgroup input:last-child,\n.p-inputgroup > .p-inputwrapper:last-child,\n.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext {\n    border-top-right-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n    border-bottom-right-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n}\n\n.p-inputgroup .p-floatlabel:last-child input {\n    border-top-right-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n    border-bottom-right-radius: ").concat(dt("inputgroup.addon.border.radius"), ";\n}\n\n.p-inputgroup-fluid .p-button {\n    width: auto;\n}\n\n.p-inputgroup-fluid .p-button.p-button-icon-only {\n    width: 2.5rem;\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance;
    return ["p-inputgroup", {
      "p-inputgroup-fluid": instance.hasFluid
    }];
  }
};
var InputGroupStyle = BaseStyle.extend({
  name: "inputgroup",
  theme,
  classes
});

// node_modules/.pnpm/primevue@4.0.2_vue@3.4.31_typescript@5.5.3_/node_modules/primevue/inputgroup/index.mjs
var script$1 = {
  name: "BaseInputGroup",
  "extends": script,
  props: {
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: InputGroupStyle,
  provide: function provide() {
    return {
      $pcInputGroup: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "InputGroup",
  "extends": script$1,
  inheritAttrs: false,
  inject: {
    $pcFluid: {
      "default": null
    }
  },
  computed: {
    hasFluid: function hasFluid() {
      return isEmpty(this.fluid) ? !!this.$pcFluid : this.fluid;
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_inputgroup.js.map
