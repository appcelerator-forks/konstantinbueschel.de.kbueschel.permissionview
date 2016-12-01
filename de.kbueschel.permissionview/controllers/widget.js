var LTAG = '[de.kbueschel.permissionview]',
    BUTTON_ID_ALLOW = 'allow',
    ANIMATION_DURATION = 250,
    _maxButtonWidth = 110;


/**
 * SEF to organize otherwise inline code
 *
 * @private
 * @param {Object} args arguments passed to the controller
 * @returns void
 */
(function constructor(args) {
    
    'use strict';
    
    
    _.defaults(args, {
        
        headerImage: '',
        
        title: 'Permission',
        description: 'Permission Description',
        
        buttons: ['Cancel', 'Allow']
    });
    
    _applyProperties(args);

})($.args);


/**
 * Cleans up the controller and view
 *
 * @private
 * @method cleanup
 * @returns void
 */
function cleanup() {
    
    Ti.API.debug(LTAG, 'Cleaning up ...');

    
    $.removeListener();
    $.destroy();
    $.off();
    
    return;
    
} // END cleanup()


/**
 * Apply properties wrapper to views
 *
 * @private
 * @param {Object} properties
 * @returns void
 */
function _applyProperties(properties) {
    
    if (properties) {
        
        $.updateViews({
            
            '#image': {
                
                image: properties.headerImage
            },
            
            '#title': {
                
                text: properties.title
            },
            
            '#description': {
                
                text: properties.description
            },
            
            '#cancel': {
                
                title: properties.buttons[0]
            },
            
            '#allow': {
                
                title: properties.buttons[1]
            }
        });
    }
    
} // END _applyProperties()


/**
 * Closes view
 *
 * @private
 * @returns void
 */
function _close() {
    
    $.window && $.window.close();
    
} // END _close()


/**
 * Opens view
 *
 * @private
 * @returns void
 */
function _open() {
    
    $.window && $.window.open();
    
} // END _open()


/**
 * Shows up view
 *
 * @private
 * @param {Object} event
 * @returns void
 */
function show(event) {
    
    // calculate best button size
    var minButtonWidth = Math.max($.cancel.size.width, $.allow.size.width);
    
    minButtonWidth < _maxButtonWidth && (minButtonWidth = _maxButtonWidth);
    
    $.cancel.setWidth(minButtonWidth);
    $.allow.setWidth(minButtonWidth);
    
    require('alloy/animation').fadeIn($.window, ANIMATION_DURATION);
    
} // END show()


/**
 * Hide view
 *
 * @private
 * @returns {Promise}
 */
function _hide() {
    
    var Promise = require(WPATH('vendor/q')),
        deferred = Promise.defer();
    
    require('alloy/animation').fadeOut($.window, ANIMATION_DURATION, deferred.resolve);
    
    return deferred.promise;
    
} // END _hide()


/**
 * Handles click on button in dialog
 *
 * @private
 * @param {Object} event
 * @returns void
 */
function handleClick(event) {
    
    $.cancel.setEnabled(false);
    
    $.allow.setEnabled(false);
    
    _hide().then(function() {
        
        $.trigger('click', {
            
            type: 'click',
            success: (event.source.id === BUTTON_ID_ALLOW),
            source: $
        });
        
        _close();
    });
    
    return;
    
} // END handleClick()


// PUBLIC INTERFACE
exports.cleanup = cleanup;
exports.close = _close;
exports.open = _open;
