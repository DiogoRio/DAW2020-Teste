const fs = require('fs')


fs.readFile('./batismos.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    var tmp = jsonString.replace(/\sref:\s/g,"\t\"ref\":").replace(/\sdate:\s/g,"\t\"date\":").replace(/\shref:\s/g,"\t\"href\":").replace(/\stitle:\s/g,"\t\"title\":");
    fs.writeFile('./batismos-fix.json', tmp, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
})