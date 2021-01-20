const fs = require('fs')


fs.readFile('./batismos-manual-fix.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var json = JSON.parse(jsonString);
    json.forEach(i => {
        i._id = i.ref.split("/").join("_");
        var tmp = i.title.split("Pai: ")[1]
        var pai = tmp.split(";")[0]
        var mae = i.title.split("Mãe: ")[1]
        i.pai = pai
        i.mae = mae
    })
    var data = JSON.stringify(json, null, 2);
    fs.writeFile('./batismos-full-fixed.json', data, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

})
