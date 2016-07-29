var _ = require('lodash');

function TripleGenerator() {
}

TripleGenerator.prototype.enrichDocs = function(docs) {
  _.each(docs, function(doc) {
    doc.triples = [];

    knownDocs = _.sampleSize(docs, 2);
    createKnownTriples(doc, knownDocs);

    createTriple(doc,
      getUri(doc),
      'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      'http://xmlns.com/foaf/0.1/Person'
    );
  });
  return docs;
};

function createKnownTriples(doc, knownDocs) {
  _.each(knownDocs, function(knownDoc) {
    createTriple(doc,
      getUri(doc),
      'http://xmlns.com/foaf/0.1/knows',
      getUri(knownDoc)
    );
  });
}

function createTriple(doc, subject, predicate, object) {
  doc.triples.unshift(
    { triple:
      {
        subject: subject,
        predicate: predicate,
        object: object
      }
    }
  );
}

function getUri(doc) {
  return ('/sample-data/' + _.last(doc.path.split('/')));
}

module.exports = TripleGenerator;
