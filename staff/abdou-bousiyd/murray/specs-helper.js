beforeEach(function () {
  jasmine.addMatchers({
    toBePrimitive: function () {
      return {
        compare: function (target, expected) {
          var type = typeof target;

          return {
            pass: type !== 'object' && type !== 'function'
          };
        }
      };
    }
  });
});
