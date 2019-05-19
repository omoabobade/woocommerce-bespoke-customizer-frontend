'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Customizer = function (_React$Component) {
    _inherits(Customizer, _React$Component);

    function Customizer(props) {
        _classCallCheck(this, Customizer);

        var _this = _possibleConstructorReturn(this, (Customizer.__proto__ || Object.getPrototypeOf(Customizer)).call(this, props));

        _this.activeDomain = "https://www.marcomartinez.clothing/demo/";

        _this.fetchCategories = function (itemId) {
            return function (e) {

                fetch(_this.activeDomain + "?api_request=fetchCategories&itemId=" + itemId, { method: 'get' }).then(function (response) {
                    return response.json();
                }).then(function (categories) {
                    _this.setState({ categories: categories });
                });
            };
        };

        _this.fetchLabels = function (catId) {
            return function (e) {
                var categories = _this.state.categories;
                var category = categories.filter(function (cat) {
                    return cat.id == catId;
                })[0];
                _this.setState({ category: category });
                fetch(_this.activeDomain + "?api_request=fetchLabels&catId=" + catId, { method: 'get' }).then(function (response) {
                    return response.json();
                }).then(function (labels) {
                    _this.setState({ labels: labels });
                });
            };
        };

        _this.setSelected = function (title) {
            return function (e) {
                var data = _this.state.data;
                data[[_this.state.category.title]] = title;
                _this.setState({ data: data });
            };
        };

        _this.saveCustomizer = function (e) {
            var bespoke_customization = _this.state.data;
            //cost prodId = 
            console.log(e);
            var data = { bespoke_customization: bespoke_customization };
            var url = _this.activeDomain + "?api_request=saveCustomData";
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json();
            }).then(function (response) {
                console.log('Success:', JSON.stringify(response));
            }).catch(function (error) {
                return console.error('Error:', error);
            });
        };

        _this.state = { items: [], categories: [], category: {}, labels: [], data: {} };
        _this.fetchCategories = _this.fetchCategories.bind(_this);
        _this.fetchLabels = _this.fetchLabels.bind(_this);
        _this.fetchItems();
        return _this;
    }

    _createClass(Customizer, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "fetchItems",
        value: function fetchItems() {
            var _this2 = this;

            fetch(this.activeDomain + "?api_request=fetchItems", { method: 'get' }).then(function (response) {
                return response.json();
            }).then(function (items) {
                _this2.setState({ items: items });
            });
        }
    }, {
        key: "parseCategories",
        value: function parseCategories(id) {
            var _this3 = this;

            return this.state.categories.map(function (category) {
                return id == category.item_id ? React.createElement(
                    "div",
                    { className: "collapse show", "aria-labelledby": "headingOne", "data-parent": "#accordionExample" },
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "div",
                            { className: "card", key: category.id.toString() },
                            React.createElement(
                                "div",
                                { className: "card-header", id: "headingOne" },
                                React.createElement(
                                    "h5",
                                    { className: "mb-0" },
                                    React.createElement(
                                        "button",
                                        { className: "btn btn-link", onClick: _this3.fetchLabels(category.id), type: "button", "aria-expanded": "true", "aria-controls": "collapseOne" },
                                        category.title
                                    )
                                )
                            ),
                            _this3.parseLabels(category.id)
                        )
                    )
                ) : "";
            });
        }
    }, {
        key: "parseLabels",
        value: function parseLabels(id) {
            var _this4 = this;

            debugger;
            if (this.state.labels.length == 0) return;
            var figures = this.state.labels.map(function (label) {
                return label.category_id == id ? _this4.parseFigures(label) : "";
            });
            if (!figures['0']) return;
            return React.createElement(
                "div",
                { className: "collapse show", "aria-labelledby": "headingOne" },
                React.createElement(
                    "div",
                    { className: "card-body" },
                    React.createElement(
                        "p",
                        null,
                        this.state.category.details
                    ),
                    React.createElement(
                        "div",
                        null,
                        figures
                    )
                )
            );
        }
    }, {
        key: "parseFigures",
        value: function parseFigures(label) {
            var selected = _typeof(this.state.data[[this.state.category.title]]) !== undefined && this.state.data[[this.state.category.title]] == label.title ? true : false;
            return React.createElement(
                "figure",
                { className: selected ? "figure fon" : "figure ", style: { width: "22%", padding: "2%" }, onClick: this.setSelected(label.title) },
                React.createElement("img", { src: label.picture, className: "figure-img img-fluid rounded", alt: label.title }),
                React.createElement(
                    "figcaption",
                    { className: "figure-caption" },
                    label.title,
                    selected ? React.createElement("span", { className: "oi oi-check", style: { float: "right" }, title: "icon check", "aria-hidden": "true" }) : ""
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                "div",
                { id: "exampleModalLong", className: "modal fade show", tabIndex: "-1", role: "dialog", "aria-labelledby": "exampleModalLongTitle", style: { display: "block", paddingLeft: "0px;" } },
                React.createElement(
                    "div",
                    { className: "modal-dialog", role: "document" },
                    React.createElement(
                        "div",
                        { className: "modal-content" },
                        React.createElement(
                            "div",
                            { className: "modal-header" },
                            React.createElement(
                                "h5",
                                { className: "modal-title" },
                                " Your Customization : ",
                                React.createElement("span", { id: "bespoke_product_title" })
                            ),
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-3" },
                                    React.createElement("img", { id: "bespoke_img_src", src: "", width: "50px", style: { float: "left" } })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-8" },
                                    React.createElement("h6", { id: "bespoke_product_price" })
                                )
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "close modal-close", "aria-label": "Close" },
                                React.createElement(
                                    "span",
                                    { "aria-hidden": "true" },
                                    "\xD7"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "modal-body" },
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-secondary save-btn btn-sm btn-block", "data-id": "", onClick: this.saveCustomizer },
                                "Save Customization"
                            ),
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-12" },
                                    React.createElement(
                                        "div",
                                        { className: "accordion" },
                                        this.state.items.map(function (item) {
                                            return React.createElement(
                                                "div",
                                                { className: "card", id: "parentCard", key: item.id.toString(), onClick: _this5.fetchCategories(item.id) },
                                                React.createElement(
                                                    "div",
                                                    { className: "card-header" },
                                                    React.createElement(
                                                        "h5",
                                                        { className: "mb-0" },
                                                        React.createElement(
                                                            "button",
                                                            { className: "btn btn-link", type: "button", "aria-expanded": "true", "aria-controls": "collapseOne" },
                                                            item.title
                                                        )
                                                    )
                                                ),
                                                _this5.parseCategories(item.id)
                                            );
                                        })
                                    )
                                )
                            ),
                            React.createElement(
                                "button",
                                { type: "button", className: "btn btn-secondary save-btn btn-sm btn-block", "data-id": "", onClick: this.saveCustomizer },
                                "Save Customization"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Customizer;
}(React.Component);

var domContainer = document.querySelector('#customizer_container');
ReactDOM.render(e(Customizer), domContainer);