# “Drive-Thru Lane Visualizer”
- Implemented *json-server* for creating API
- API integration with `httpClient` at 
  GET->http://localhost:3000/api/lanes/1 & http://localhost:3000/api/lanes/2
- Implemented Catching to reduce Multiple API calls
- `npm start` launches both app & json-server. I have used concurrently package to run both at a time.
- To avoid CORS issue add extension of CORS in our browser and enable it.
- To run server run the command - npm run json:server
- Lanes fit to that content no scroll bars and given 5% marging to svg
- Used Polyline and SVG to draw the line connecting XY Coordinates
- Labels are displayed only for vertexType SERVICE_POINT
- Differented vertexType based on colors
- To Switch between lines Select the Options in DropDown

# Angular Best Practices
- Used @angular-eslint/schematics for linting
- To check npm run lint
- Catching data of mock api's
- Unit testing


# Tech stack
- Angular(19.2.0)
- node(22.14.0)
- npm(11.3.0)
- Json-server(0.17.4)
- rxjs(7.8.0)
- eslint(9.23.0)
- SVG
- Unit Testing(Jasmine+Karma)

  Document ::[Drive-Thru-Lane-Visualizer.docx](https://github.com/user-attachments/files/20022797/Drive-Thru-Lane-Visualizer.docx)
