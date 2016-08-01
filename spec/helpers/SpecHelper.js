var JasmineConsoleReporter = require('jasmine-console-reporter');
var reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2 
    cleanStack: 1,       // (0|false)|(1|true)|2|3 
    verbosity: 4,        // (0|false)|1|2|(3|true)|4 
    listStyle: 'indent', // "flat"|"indent" 
    activity: false
});
// jasmine.getEnv().addReporter(reporter); 

beforeEach(function () {
  jasmine.addMatchers({
    toHaveTriple: function(util, customEqualityTesters) {
      return {
        compare: function(actual, subject, predicate, object) {
          var result = {};
          result.pass = util.equals(
            actual.triples, 
            jasmine.arrayContaining([
              { 'triple':
                {
                  'subject':subject,
                  'predicate': predicate,
                  'object': object
                }
              }
            ])
          );
          if (!result.pass) {
            result.message = "Expected" + JSON.stringify(actual.triples) + "to have triple:\n <" + subject + "> <" + predicate + "> <" + object + "> .";
          }
          return result;
        }
      };
    }
  });
});
