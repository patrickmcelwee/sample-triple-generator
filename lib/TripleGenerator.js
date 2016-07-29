var _ = require('lodash');

function TripleGenerator() {
}

TripleGenerator.prototype.enrichDocs = function(docs) {
  _.each(docs, function(doc) {
    doc.triples = [];
  });
  return docs;
};

module.exports = TripleGenerator;
