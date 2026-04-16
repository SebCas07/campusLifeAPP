// netlify/functions/event.js
// This is a Netlify Serverless function 

// What "serverless" means is that Netlify runs this code
// on their servers when the browser calls it.  The browser never
// sees the token - it only ever sees the events data we send back as the response

// Browser calls:  /.netlify/functions/events
// THis function calls: Eventbrite API (w/secret token)
// THis function sends: the events data back to the browser

exports.handler = async function (event, context) { 
    // exports.handler is the entry point Netlify looks for. 
    // It runs every time someone calls /.netlify/functions/events. 

    // 'event' contains info about the incoming request 
    // (query parameters, headers, HTTP method, etc)

    // 'context' contains info about the Netlify enviorment
    // (we won't need it here but it's always passed in)

    // READ THE TOKEN FROM ENVIROMENT VARIABLES

    // process.env.EVENTBRITE_TOKEN reads form Netlify's 
    // secure enviorment var storage - NOT from any file in 
    // project.  this is set in the NEtlify dashboard under 
    // Site Settings -> Enviroment Var

    // THis makes it so the token never appears in 
    // any file that gets pushed to Github

    const token = process.env.EVENTBRITE_TOKEN; 
    // const orgId = process.env.EVENTBRTIE_ORD_ID;

    if( !token) { 
        // if enviorment var aren't set yet, 
        // return a helpful error instead of crashing. 
        return { 
            statusCode: 500, 
            body: JSON.stringify({
                error: 'Eventbrite credentials not configured in Netlify enviorment variables.'
            })
        };
    }

    // BUILD TODAY'S DATE RANGE
    const today = new Date(); 
    const startOfDay = today.toISOString().split('T')[0] + 'T00:00:00';
    const endOfDay = today.toISOString().split('T')[0] + 'T23:59:59'; 

    const apiUrl = `https://www.eventbriteapi.com/v3/events/search/?token=${token}&q=YOUR+SCHOOL+NAME+HERE&start_date.range_start=${startOfDay}&start_date.range_end=${endOfDay}&expand=venue`;

    // CALL EVENTBRITE
    try{ 
        // THis fetch runs on Netlify's SERVER = not in the browser.
        // Server to server requests don't have CORS restrictions, 
        // which is why a allorgins proxy is not needed
        const response = await fetch(apiUrl); 

        if(!response.ok) { 
            throw new Error (`Eventbrite API responded with status: ${response.status}`);
        }

        const data = await response.json(); 

        // SEND DATA BACK TO THE BROWSER
            // returns a standard HTTP response object.
            // statusCode = success.
            // headers: we add CORS headers so our browser pages
            // are allowed to receive this response.
            // body: the events JSON as a string. 
        return{ 
            statusCode: 200, 
            headers: { 
                'Content-Type': 'application/json', 
                // Access-control-allow-origin tells the browser which 
                // sites are allowed to receive this rsponse.
                // '*' means any site
                // NOTE: in production set this to exact domain 

                'Access-Control-Allow-Origin': '*'
            },
            
            body: JSON.stringify(data)
        };
    } catch(error) { 
        // HANDLE ERRORS
        console.error('Eventbrite fetch failed:', error); 

        return { 
            statusCode: 500, 
            headers: { 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
                error: 'Failed to fetch events from Eventbrite.', 
                details: error.message
            })
        };
    }
}