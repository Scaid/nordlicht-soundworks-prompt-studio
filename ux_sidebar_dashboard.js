(function(root){
'use strict';
// v7.5.10 compatibility boundary: dashboard and sidebar ownership moved to the
// localized workspace shell and NSWWorkspaceNavigation. Keeping this module as
// a no-op prevents older installations from requiring a changed script list.
root.NSWLegacySidebarDashboard=Object.freeze({VERSION:'7.5.10',retired:true});
})(typeof globalThis!=='undefined'?globalThis:this);
