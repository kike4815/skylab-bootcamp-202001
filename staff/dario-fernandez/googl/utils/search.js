'use strict'

function search(url, itemSelector, titleSelector, linkSelector, descriptionSelector, callback){
    call('https://skylabcoders.herokuapp.com/proxy?url=' + url, function(response) {
        if(response instanceof Error) {
            return callback(response)
        }

        var doc = new DOMParser().parseFromString(response.content, 'text/html')

        var items = doc.querySelectorAll(itemSelector)

        var results = []

        for (var i = 0; i < items.length; i++) {
            var item = items[i]

            var title = item.querySelector(titleSelector)

            if (title) {
                var result = {}

                result.title = title.innerText
    
                result.description = item.querySelector(descriptionSelector).innerText
                
                result.link = item.querySelector(linkSelector).href
            }

            results.push(result)
        }

        callback(results)
    }
)
}