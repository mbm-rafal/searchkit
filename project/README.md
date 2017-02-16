# Access

http://search-testing-1-4co5g2sonm67jboa5767dixy44.us-east-1.es.amazonaws.com/mbm.test.v1/_search?pretty
http://search-testing-1-4co5g2sonm67jboa5767dixy44.us-east-1.es.amazonaws.com/mbm.test.v1/_mapping?pretty

# Mapping

```
{
  "mbm.test.v1" : {
    "mappings" : {
      "profile" : {
        "dynamic_templates" : [ {
          "profile_attributes" : {
            "mapping" : {
              "type" : "nested"
            },
            "path_match" : "events.profile_attributes.*.attributes"
          }
        }, {
          "profile_attributes_keys" : {
            "mapping" : {
              "index" : "not_analyzed",
              "type" : "string"
            },
            "path_match" : "events.profile_attributes.*.attributes.key"
          }
        }, {
          "revenue" : {
            "mapping" : {
              "index" : "not_analyzed",
              "type" : "long"
            },
            "path_match" : "revenue.*"
          }
        } ],
        "properties" : {
          "address" : {
            "type" : "nested",
            "properties" : {
              "address" : {
                "type" : "string"
              },
              "city" : {
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              },
              "country" : {
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              },
              "state" : {
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              }
            }
          },
          "company_name" : {
            "type" : "string",
            "fields" : {
              "raw" : {
                "type" : "string",
                "index" : "not_analyzed"
              }
            }
          },
          "email" : {
            "type" : "string",
            "index" : "not_analyzed"
          },
          "events" : {
            "type" : "nested",
            "properties" : {
              "categories" : {
                "type" : "nested",
                "properties" : {
                  "ancestors" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  },
                  "level" : {
                    "type" : "integer"
                  },
                  "order" : {
                    "type" : "integer"
                  },
                  "value" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              },
              "id" : {
                "type" : "integer"
              },
              "items" : {
                "type" : "nested",
                "properties" : {
                  "attributes" : {
                    "type" : "nested",
                    "properties" : {
                      "key" : {
                        "type" : "string",
                        "index" : "not_analyzed"
                      },
                      "name" : {
                        "type" : "string",
                        "fields" : {
                          "raw" : {
                            "type" : "string",
                            "index" : "not_analyzed"
                          }
                        }
                      }
                    }
                  },
                  "category" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  },
                  "description" : {
                    "type" : "nested"
                  },
                  "group" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  },
                  "key" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  },
                  "name" : {
                    "type" : "string",
                    "fields" : {
                      "raw" : {
                        "type" : "string",
                        "index" : "not_analyzed"
                      }
                    }
                  }
                }
              },
              "name" : {
                "type" : "string",
                "index" : "not_analyzed"
              },
              "opportunities" : {
                "properties" : {
                  "name" : {
                    "type" : "string"
                  }
                }
              },
              "profile_attributes" : {
                "type" : "nested"
              },
              "role" : {
                "type" : "nested",
                "properties" : {
                  "name" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              }
            }
          },
          "full_name" : {
            "type" : "string",
            "fields" : {
              "raw" : {
                "type" : "string",
                "index" : "not_analyzed"
              }
            }
          },
          "revenue" : {
            "type" : "nested"
          }
        }
      }
    }
  }
}
```


# INPUT

```
POST /profile
{
    "email" : "a1@mbm.com",
    "company_name" : "US Bank",
    "events" : [ {
      "id" : "1",
      "name" : "EVENT_A",
      "role" : {"name" : "attendee"},
      "items": [
            {"name": "AAA"},
            {"name": "BBB"}
        ],
        "profile_attributes": {
            "product_certs": {
                "group": "test",
                "attributes": [
                    { "key": "ATTR_1" },
                    { "key": "ATTR_2" },
                    { "key": "ATTR_3" }
                ]
            }
        },
        "categories": [
            {"value": "CAT_2"},
            {"value": "CAT_3"},
            {"value": "CAT_4"}
        ]
      },
      {
      "id" : "2",
      "name" : "EVENT_B",
      "role" : {"name" : "attendee"},
      "items": [
            {"name": "AAA"},
            {"name": "BBB"}
        ],
        "profile_attributes": {
            "product_certs": {
                "group": "test",
                "attributes": [
                    { "key": "ATTR_1" },
                    { "key": "ATTR_2" },
                    { "key": "ATTR_3" },
                    { "key": "ATTR_4" },
                    { "key": "ATTR_5" }
                ]
            }
        },
        "categories": [
            {"value": "CAT_1"},
            {"value": "CAT_2"}
        ]
      }
    ]
}

```