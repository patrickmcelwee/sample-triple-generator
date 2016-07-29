var _ = require('lodash');

function TripleGenerator() {
}

TripleGenerator.prototype.enrichDocs = function(docs) {
  _.each(docs, function(doc) {
    knownDocs = _.sampleSize(docs, 2);
    doc.triples = [];
    _.each(knownDocs, function(knownDoc) {
      doc.triples.unshift(
        { triple:
          {
            subject:  getUri(doc),
            predicate: 'http://xmlns.com/foaf/0.1/knows',
            object: getUri(knownDoc)
          }
        }
      );
    });
  });
  return docs;
};

function getUri(doc) {
  return ('/sample-data/' + _.last(doc.path.split('/')));
}

module.exports = TripleGenerator;
