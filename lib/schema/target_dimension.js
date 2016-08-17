module.exports  = {
  "target_dimension": {
    "id": "/target_dimension",
    "type": "object",
    "properties": {
      "code": {
        "id": "/target_dimension/code",
        "type": "string"
      }
    },
    "required": []
  },
  "allOf": [
    {
      "$ref": "common.json#/entity"
    },
    {
      "id": "/target_dimension",
      "type": "object",
      "properties": {
        "code": {
          "id": "/target_dimension/code",
          "type": "string"
        }
      },
      "required": []
    }
  ]
};
