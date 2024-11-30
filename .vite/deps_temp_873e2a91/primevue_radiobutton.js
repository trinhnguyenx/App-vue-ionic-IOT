import {
  script
} from "./chunk-IVPXFQ63.js";
import {
  BaseStyle
} from "./chunk-R5DHDY7V.js";
import {
  equals
} from "./chunk-5KY5SIIS.js";
import {
  createBaseVNode,
  createElementBlock,
  mergeProps,
  openBlock
} from "./chunk-GI7C4HJS.js";
import "./chunk-AMBSP7Z4.js";

// node_modules/.pnpm/primevue@4.0.2_vue@3.4.31_typescript@5.5.3_/node_modules/primevue/radiobutton/style/index.mjs
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-radiobutton {\n    position: relative;\n    display: inline-flex;\n    user-select: none;\n    vertical-align: bottom;\n    width: ".concat(dt("radiobutton.width"), ";\n    height: ").concat(dt("radiobutton.height"), ";\n}\n\n.p-radiobutton-input {\n    cursor: pointer;\n    appearance: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    opacity: 0;\n    z-index: 1;\n    outline: 0 none;\n    border: 1px solid transparent;\n    border-radius: 50%;\n}\n\n.p-radiobutton-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n    border: 1px solid ").concat(dt("radiobutton.border.color"), ";\n    background: ").concat(dt("radiobutton.background"), ";\n    width: ").concat(dt("radiobutton.width"), ";\n    height: ").concat(dt("radiobutton.height"), ";\n    transition: background ").concat(dt("radiobutton.transition.duration"), ", color ").concat(dt("radiobutton.transition.duration"), ", border-color ").concat(dt("radiobutton.transition.duration"), ", box-shadow ").concat(dt("radiobutton.transition.duration"), ", outline-color ").concat(dt("radiobutton.transition.duration"), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt("radiobutton.shadow"), ";\n}\n\n.p-radiobutton-icon {\n    transition-duration: ").concat(dt("radiobutton.transition.duration"), ";\n    background: transparent;\n    font-size: ").concat(dt("radiobutton.icon.size"), ";\n    width: ").concat(dt("radiobutton.icon.size"), ";\n    height: ").concat(dt("radiobutton.icon.size"), ";\n    border-radius: 50%;\n    backface-visibility: hidden;\n    transform: translateZ(0) scale(0.1);\n}\n\n.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {\n    border-color: ").concat(dt("radiobutton.hover.border.color"), ";\n}\n\n.p-radiobutton-checked .p-radiobutton-box {\n    border-color: ").concat(dt("radiobutton.checked.border.color"), ";\n    background: ").concat(dt("radiobutton.checked.background"), ";\n}\n\n.p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {\n    background: ").concat(dt("radiobutton.icon.checked.color"), ";\n    transform: translateZ(0) scale(1, 1);\n    visibility: visible;\n}\n\n.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {\n    border-color: ").concat(dt("radiobutton.checked.hover.border.color"), ";\n    background: ").concat(dt("radiobutton.checked.hover.background"), ";\n}\n\n.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {\n    background: ").concat(dt("radiobutton.icon.checked.hover.color"), ";\n}\n\n.p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {\n    border-color: ").concat(dt("radiobutton.focus.border.color"), ";\n    box-shadow: ").concat(dt("radiobutton.focus.ring.shadow"), ";\n    outline: ").concat(dt("radiobutton.focus.ring.width"), " ").concat(dt("radiobutton.focus.ring.style"), " ").concat(dt("radiobutton.focus.ring.color"), ";\n    outline-offset: ").concat(dt("radiobutton.focus.ring.offset"), ";\n}\n\n.p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {\n    border-color: ").concat(dt("radiobutton.checked.focus.border.color"), ";\n}\n\n.p-radiobutton.p-invalid > .p-radiobutton-box {\n    border-color: ").concat(dt("radiobutton.invalid.border.color"), ";\n}\n\n.p-radiobutton.p-variant-filled .p-radiobutton-box {\n    background: ").concat(dt("radiobutton.filled.background"), ";\n}\n\n.p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {\n    background: ").concat(dt("radiobutton.checked.background"), ";\n}\n\n.p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {\n    background: ").concat(dt("radiobutton.checked.hover.background"), ";\n}\n\n.p-radiobutton.p-disabled {\n    opacity: 1;\n}\n\n.p-radiobutton.p-disabled .p-radiobutton-box {\n    background: ").concat(dt("radiobutton.disabled.background"), ";\n    border-color: ").concat(dt("radiobutton.checked.disabled.border.color"), ";\n}\n\n.p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {\n    background: ").concat(dt("radiobutton.icon.disabled.color"), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-radiobutton p-component", {
      "p-radiobutton-checked": instance.checked,
      "p-disabled": props.disabled,
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled" || instance.$primevue.config.inputVariant === "filled"
    }];
  },
  box: "p-radiobutton-box",
  input: "p-radiobutton-input",
  icon: "p-radiobutton-icon"
};
var RadioButtonStyle = BaseStyle.extend({
  name: "radiobutton",
  theme,
  classes
});

// node_modules/.pnpm/primevue@4.0.2_vue@3.4.31_typescript@5.5.3_/node_modules/primevue/radiobutton/index.mjs
var script$1 = {
  name: "BaseRadioButton",
  "extends": script,
  props: {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
      type: String,
      "default": null
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: RadioButtonStyle,
  provide: function provide() {
    return {
      $pcRadioButton: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "RadioButton",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:modelValue", "change", "focus", "blur"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        var newModelValue = this.binary ? !this.checked : this.value;
        this.$emit("update:modelValue", newModelValue);
        this.$emit("change", event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.$emit("blur", event);
    }
  },
  computed: {
    checked: function checked() {
      return this.modelValue != null && (this.binary ? !!this.modelValue : equals(this.modelValue, this.value));
    }
  }
};
var _hoisted_1 = ["data-p-checked", "data-p-disabled"];
var _hoisted_2 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "aria-labelledby", "aria-label", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, $options.getPTOptions("root"), {
    "data-p-checked": $options.checked,
    "data-p-disabled": _ctx.disabled
  }), [createBaseVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "radio",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.value,
    name: _ctx.name,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions("input")), null, 16, _hoisted_2), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("box")
  }, $options.getPTOptions("box")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("icon")
  }, $options.getPTOptions("icon")), null, 16)], 16)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_radiobutton.js.map
