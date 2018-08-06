export default {<% for (actionType of actionTypes) { %>
    <%= actionType %>: "<%= actionType %>",<% } %>
};
