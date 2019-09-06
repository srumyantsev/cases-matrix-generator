        //http://cwestblog.com/2011/05/02/cartesian-product-of-multiple-arrays/
        function cartesianProductOf() {
            return Array.prototype.reduce.call(arguments, function (a, b) {
                var ret = [];
                a.forEach(function (a) {
                    b.forEach(function (b) {
                        ret.push(a.concat([b]));
                    });
                });
                return ret;
            }, [[]]);
        }

        window.addEventListener("load", function (event) {
            new Vue({
                el: '#app',
                data: {
                    requirements: [
                        { title: 'Select example', options: [{ value: "Option #1" }, { value: "Option #2" }] },
                        { title: 'Select example', options: [{ value: "Option #A" }, { value: "Option #B" }, { value: "Option #C" }] },
                        { title: 'Result example', options: [{ value: "" }] }
                    ]
                },
                computed: {
                    resultCases: function () {
                        return cartesianProductOf(...this.requirements.map(r => r.options.map(o => o.value)));
                    }
                },
                methods: {
                    deleteItem: function (collection, itemIndex) {
                        if (confirm('Are you sure you want to delete item?')) {
                            collection.splice(itemIndex, 1);
                        }
                    },
                    moveItem: function (collection, originalIndex, isUp) {
                        let newIndex = isUp ? originalIndex - 1 : originalIndex + 1;
                        let itemToMove = collection[originalIndex];
                        Vue.set(collection, originalIndex, collection[newIndex]);
                        Vue.set(collection, newIndex, itemToMove);
                    },
                    addRequirement: function (requirementIndex, isBefore) {
                        let indexToAdd = isBefore ? requirementIndex : requirementIndex + 1;
                        this.requirements.splice(indexToAdd, 0, this.createNewRequirement())
                    },
                    addRequirementOption: function (options, optionIndex, isBefore) {
                        let indexToAdd = isBefore ? optionIndex : optionIndex + 1;
                        options.splice(indexToAdd, 0, { value: "Option" });
                    },
                    createNewRequirement: function () {
                        return { title: 'Select example', options: [{ value: "Option #1" }] };
                    }
                }
            });
        });