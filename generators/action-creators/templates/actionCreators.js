import actionTypes from "<%= importActionTypesPath %>";
<% for (var i = 0; i < actionCreators.length; i++) { %>
export function <%= actionCreators[i] %>(item) {
    return {
        type: actionTypes.<%= actionTypes[i] %>,
        payload: item,
    };
}
<% } %>