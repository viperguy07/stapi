# stapi
Gaming clan member manager API

Add member
```
    Method: POST
    Url: "http://localhost:5001/members"
    json: {
	    "fullName":"John Doe",
	    "userFbId":"1234567890",
        "nickname": "STe6 iTz Psychedelik", // Optional
        "status': 0,  // Optional
        "rank": 99  // Optional
    }
```
Update member
```
    Method: PATCH
    Note: Must be an arry with objects
    Url: "http://localhost:5001/members/{userFbId}"
    json: [
	    {
            "updateMem": 
                "nickname",  // Name of the key you what to update
                "value": "STe6 iTz Psychedelik" // New value for the key
        }
    ]
```

Get all members
```
    Method: GET
    Url: "http://localhost:5001/members"
```

Get one member
```
    Method: GET
    Url: "http://localhost:5001/members/{userFbId}"
```
