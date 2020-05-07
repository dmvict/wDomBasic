(function _aCommon_js_() {

'use strict';

/**
  Collection of routines for a browser to operate DOM elements and its events. No matter whatever problem in a browser you are trying to solve several routines of DomBase would help you to solve it faster. It has something in common with Jquery, but no significant overlap. Use the module to get access to shortcuts for a browser.
  @module Tools/base/DomBasic
*/

/**
 * Collection of routines for a browser to operate DOM elements and its events.
 * @namespace Tools.dom
 * @module Tools/base/DomBasic
 */

var _global = _global_;
var _ = _global.wTools;
let Self = _.dom = _.dom || Object.create( null );
var $ = jQuery;

// --
// checkers
// --

function eventIs( src )
{
  if( src instanceof Event )
  return true;
  if( typeof jQuery === 'undefined' )
  return false;
  if( src instanceof jQuery.Event )
  return true;
  return false;
}

//

function htmlIs( src )
{
  return _ObjectToString.call( src ).indexOf( '[object HTML' ) !== -1;
}

//

function jqueryIs( src )
{
  if( typeof jQuery === 'undefined' )
  return;
  return src instanceof jQuery;
}

//

function canvasIs( src )
{
  if( _.jqueryIs( src ) )
  src = src[ 0 ];
  if( src instanceof HTMLCanvasElement )
  return true;
  return false;
}

//

function imageIs( src )
{
  if( _.jqueryIs( src ) )
  src = src[ 0 ];
  if( src instanceof HTMLImageElement )
  return true;
  return false;
}

//

function imageLike( src )
{
  if( _.jqueryIs( src ) )
  src = src[ 0 ];
  if( src instanceof HTMLCanvasElement )
  return true;
  if( src instanceof HTMLImageElement )
  return true;
  return false;
}

//

function domIs( src )
{
  if( !_global.Node )
  return false;
  return src instanceof Node;
}

//

function domLike( src )
{
  if( !_global.Node )
  return false;
  if( src instanceof Node )
  return true;
  return jqueryIs( src );
}

//

function domableIs( src )
{
  return _.strIs( src ) || _.domIs( src ) || _.jqueryIs( src );
}

//
// dom
//

function domInclude( filePath )
{

  var ext = _.uri.ext( filePath );

  if( _.longHas( [ 'css', 'less' ], ext ) )
  {
    var link = document.createElement( 'link' );
    link.href = filePath;
    link.type = 'text/' + ext;
    link.rel = 'stylesheet';
    link.media = 'screen,print';
    document.head.appendChild( link );
  }
  else
  {
    var script = document.createElement( 'script' );
    script.src = filePath;
    document.head.appendChild( script );
  }

}

//

function headIs( src )
{
  return _.strType( src ) === 'HTMLHeadElement';
}

//

//

function headIs( src )
{
  return _.strType( src ) === 'HTMLHeadElement';
}

//

function from( src )
{
  _.assert( arguments.length === 1 );

  if( _.dom.is( src ) )
  return src;

  if( _.arrayIs( src ) )
  src = '.' + src.join( '.' );

  _.assert( _.strIs( src ) );

  return document.querySelector( src );
}

//

function make( o )
{
  _.assert( arguments.length === 1 );
  _.routineOptions( make, o );
  _.assert( _.strDefined( o.html ) );
  _.assert( o.class === null || _.strDefined( o.class ) || _.arrayIs( o.class ) );
  _.assert( o.class === null || _.strDefined( o.class ) );
  _.assert( o.targetDom === null || _.strDefined( o.targetDom ) || _.dom.is( o.targetDom ) );

  if( !o.targetDom )
  o.targetDom = document.body;
  else if( _.strIs( o.targetDom ) )
  o.targetDom = document.querySelector( o.targetDom );

  _.assert( _.dom.is( o.targetDom ) );

  if( o.empty )
  _.dom.empty( o.targetDom );

  let result = document.createElement( 'div' );
  result.innerHTML = o.html.trim();
  result = result.firstChild;

  if( o.class )
  result.className = _.arrayAs( o.class ).join( ' ' );

  if( o.id )
  result.id = o.id;

  o.targetDom.appendChild( result );

  return result;
}

make.defaults =
{
  targetDom : null,
  html : null,
  class : null,
  id : null,
  empty : 0
}

//

function empty( targetDom )
{
  _.assert( arguments.length === 1 );
  targetDom = _.dom.from( targetDom );

  while ( targetDom.firstChild )
  targetDom.removeChild( targetDom.firstChild );
}

// --
// prototype
// --

var Proto =
{

  // checkers

  eventIs : eventIs,
  htmlIs : htmlIs,
  jqueryIs : jqueryIs,
  canvasIs : canvasIs,
  imageIs : imageIs,
  imageLike : imageLike,
  domIs : domIs,
  domLike : domLike,
  domableIs : domableIs,
  headIs : headIs,

  // dom

  domInclude : domInclude,

  _domBaselayer1Loaded : true,

}

var Routines =
{
  // checkers

  is : domIs,

  // dom

  from,
  make,
  empty,
}

_.mapExtend( _,Proto );
_.mapExtend( Self,Routines );

})();
