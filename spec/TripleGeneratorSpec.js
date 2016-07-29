var _ = require('lodash');

describe("TripleGenerator", function() {
  var TripleGenerator = require('../lib/TripleGenerator');
  var tripleGenerator;

  var doc1 = {
    path: '/path-to-sample-docs/data-1.json',
    body: {"_id":"55ee5e44f77dd7dab6656cdf","index":1,"guid":"c7511a55-afb3-4476-8dd9-43c3d96fb55f","isActive":false,"balance":"$22,002.95","picture":"http://placehold.it/32x32","age":69,"eyeColor":"green","name":"Mathews Mccray","gender":"male","company":"STREZZO","email":"mathewsmccray@strezzo.com","phone":"+1 (991) 531-2420","address":"731 Brightwater Court, Fontanelle, Missouri, 6921","about":"Est minim consectetur ullamco ipsum. Veniam veniam sit qui exercitation incididunt nostrud ea esse dolore voluptate nisi. Qui anim fugiat occaecat eu minim laborum.\r\n","registered":"2015-05-14T02:28:53 -07:00","tags":["sunt","ad","et","mollit","culpa","voluptate","eiusmod"],"friends":[{"id":0,"name":"Roxie Stout"},{"id":1,"name":"Victoria Burnett"},{"id":2,"name":"Lora Glenn"}],"greeting":"Hello, Mathews Mccray! You have 1 unread messages.","favoriteFruit":"apple","location":{"latitude":22.580852,"longitude":162.44889},"docFormat":"json"}
  };

  var doc2 = {
    path: '/path-to-sample-docs/data-10.json',
    body: {"_id":"55ee5e4497f1e963a0b91d6f","index":10,"guid":"7b492253-9c1e-4e1e-97f6-b9e3c849d6aa","isActive":false,"balance":"$12,885.57","picture":"http://placehold.it/32x32","age":55,"eyeColor":"blue","name":"Daniels Barron","gender":"male","company":"XANIDE","email":"danielsbarron@xanide.com","phone":"+1 (919) 589-3257","address":"986 Harden Street, Hamilton, Vermont, 3127","about":"Commodo sunt irure mollit fugiat ut eiusmod consequat excepteur minim enim magna sint aliquip. Adipisicing consequat exercitation labore Lorem ea velit commodo aute est et. Enim anim amet do enim est commodo. Nulla est cupidatat fugiat minim occaecat proident reprehenderit. Ipsum consectetur labore nisi culpa consectetur Lorem in ipsum amet.\r\n","registered":"2014-09-01T10:01:12 -07:00","tags":["id","id","eu","non","consectetur","deserunt","fugiat"],"friends":[{"id":0,"name":"Wong Shields"},{"id":1,"name":"Natalie Talley"},{"id":2,"name":"Williams Wilkerson"}],"greeting":"Hello, Daniels Barron! You have 3 unread messages.","favoriteFruit":"strawberry","location":{"latitude":19.391849,"longitude":-26.008492},"docFormat":"json"}
  };

  beforeEach(function() {
    tripleGenerator = new TripleGenerator();
  });

  describe('enrichDocs', function() {

    it('preserves existing json', function() {
      var docs = [doc1];
      var originalDoc1 = _.cloneDeep(docs[0]);
      var enrichedDocs = tripleGenerator.enrichDocs(docs);
      expect(enrichedDocs[0]).toEqual(jasmine.objectContaining(originalDoc1));
    });

    it('creates triples about knowing someone', function() {
      var docs = [doc1, doc2];
      var enrichedDocs = tripleGenerator.enrichDocs(docs);
      expect(enrichedDocs[0].triples).toEqual(jasmine.arrayContaining([
        { 'triple':
          {
            'subject': '/sample-data/data-1.json',
            'predicate': 'http://xmlns.com/foaf/0.1/knows',
            'object': '/sample-data/data-10.json'
          }
        }
      ]));
      expect(enrichedDocs[1].triples).toEqual(jasmine.arrayContaining([
        { 'triple':
          {
            'subject': '/sample-data/data-10.json',
            'predicate': 'http://xmlns.com/foaf/0.1/knows',
            'object': '/sample-data/data-1.json'
          }
        }
      ]));
    });

  });

});
