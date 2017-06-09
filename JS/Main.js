
var debugMode = false;
if ( debugMode == true ) { 

    // console.log( data ); 

}

// Empties the Content Div
function emptyContent() { 

    $("#content").empty();

}

// Renders Blog Page
function renderBlog () {

	blogBox();
	twitterBox();
	renderHeader( "Blog" );

}

// Renders the About Page
function renderAbout () {

    renderBlank();
    renderHeader( "About" );

}

// Sorts Projects and Inserts the top 3 in the Navagation Bar
function fillDropdownMenu () { 

    var liElem = "<li>", liElemClose = "</li>", linkElemClose = "</a>";
    var dropdownMenu = document.getElementById("dropdown");
    var projectList = sortProjects( data.projects );
    var insertStr = "";
    
        // console.log( "Drop Down: ", projectList );
    
    dropdownMenu.innerHTML = "";
    
    // Get the 3 most popular Projects
    for ( idx = 1; idx < 4 ; idx++ ) {
        var projectLink = "<a hre'javascript:void(0) onclick='renderProject( " + projectList[ idx ].id + " )'>";
        var projectName = projectList[ idx ].name;
        
        projectLink = liElem + projectLink + projectName + linkElemClose + liElemClose;
        insertStr += projectLink;
            // console.log( insertStr );
    }

    insertStr += "<li><a href='javascript:void(0)' onclick='renderProjectBox()' style='color: #AAAAAA;'> All Projects </a></li>";
    dropdownMenu.innerHTML = insertStr;

}

// Numerical Sort of Project Ratings
function sortProjects ( projectList ) { 

    return projectList.sort( function ( a, b ) { 
        // console.log( "A: ", a.rating, "B: ", b.rating ); 
        return b.rating - a.rating; 
    });

}

// Renders Project To Content Div
function renderProject ( projectId, mainPage ) { 

    var content = document.getElementById("content");
    content.innerHTML = "";
    project = data.projects.find( function( project ){ return project.id == projectId; });
    
    var contentProject = $("<iframe></iframe>")
                                .attr( "src", project.url )
                                .attr( "class", "frameCont project-container col-xs-12 col-sm-12 col-md-12 col-xl-12" )
                                .attr( "height", "600px" )
    ;
    
    $("#content").append( contentProject );
    renderHeader( project.name );
        
        //
        // Old Main Page Render Code
        //
        // if ( mainPage != true ) { renderHeader( project.name ) }
        // else { renderHeader("Clever Remark!!!") };

}

// Renders Landing Page
function renderMainPage () { 

    var content = document.getElementById("content");
    var navbarHeader = document.getElementById("navbar-header");
    var projectList = sortProjects( data.projects );
    var navbarStr = "<a class='navbar-brand' href='javascript:void(0)' onclick='renderProject( " 
                        + projectList[0].id 
                        + ", "
                        + true
                        + " )'>"
                        + projectList[0].name
                        + "</a> " 
    ;
    
    content.innerHTML = "", navbarHeader.innerHTML = "";
    
    renderProject( projectList[0].id, true );
    renderHeader( "Hello There!" );
    navbarHeader.innerHTML = navbarStr;



}

// Renders The Unique Header of Each Page
function renderHeader ( header ) { 
    document.getElementById("header-text").innerHTML = header; 
}

// Creates a list of all Projects in Data
function renderProjectBox () { 

    emptyContent();
    var projectSection = $("<section></section>")
                            .attr( "class", "project-container col-xs-12 col-sm-12 col-md-12 col-xl-12" );
    
    var projectTable = $("<table></table>")
                            .attr( "class", "col-xs-12 col-sm-12 col-md-12 col-xl-12" )
                            .attr( "id", "project-table" )
                            // This is a multi-line String
                            .append( '<tr id="project-table-header">                            \
                                        <th style="text-align: center" colspan="2">Project</th> \
                                        <th style="text-align: center">Rating</th>              \
                                        <th style="text-align: center">Description</th>         \
                                    </tr>' );

    var PROJECTS = data.projects;
        console.log( PROJECTS )
    
    PROJECTS.forEach( function( project ) { 

        if ( debugMode == true ) { console.log( project ) } 
        
        if ( project.status == "Working!" ) {

            projectTable.append( renderProjectDetails( project ) );

        } else if ( debugMode == true ) { 

            projectTable.append( renderProjectDetails( project ).attr( "id", "error" ) );

        } else { 

            //
            // Debug Code
            //
            
            projectTable.append( '<tr><td id="error" colspan="4"> Oh No! This Link is Invalid </td></tr>' )

        }
        
        
        
        
        

    });
    
    projectSection.append( projectTable );
    $("#content").append( projectSection );
    
    
    

}


function renderProjectDetails ( project ) { 

    var projectPicture =    '<td><a href="' + project.url + '" target="_blank"> \
                                    <img  id="project-image" \
                                    style="width: 100px" \
                                    src="' + project.pictureSmall + '" > \
                                </a> \
                            </td>';
    var projectTitle = '<td><a id="project-title" href="' + project.url + '" target="_blank">' + project.name + '</a></td>';
    var projectRank = '<td><span id="project-rank">' + String( project.rating ) + '</span></td>'; 
    var projectDesc = '<td><p id="project-description">' + project.desc + '</p></td>';
    
    return $("<tr></tr>")
        .attr( "id", "project-element" )
        .append( [ projectPicture, projectTitle, projectRank, projectDesc ] );

 }




// A Message for Pages that have no Content
function renderBlank () {
    $("#content")
        .empty()
        .append([
            $("<p></p>")
                .text( "Sorry! This Section is under construction" )
                .attr( "id", "error" )
        ]);
}

// Fill Web Page With Blog Data
function blogBox () {

	emptyContent();
    var BLOG_POSTS = data.blog_posts;
    var NULL_STATUS = true;
    var blogSection = $("<section></section>").attr( "class", "blog-container col-xs-9 col-sm-9 col-md-9 col-lg-9" );
	
    if ( debugMode == true ) { console.log( "", BLOG_POSTS ); }
    if ( debugMode == true ) { console.log( "", blogSection ) }
	
	BLOG_POSTS.forEach( function( blog ) {

		if ( debugMode == true ) { console.log( blog ); }
        
		if ( blog.status != "filler" ) { 
        
            NULL_STATUS = false;
            blogSection.append( createBlogPost( blog ) ); 
        
        }
        else if ( debugMode == true ) { blogSection.append( createBlogPost( blog ) ); }

	});
	
    if ( NULL_STATUS == true && debugMode == false ) { 

        blogSection.html( 

            '<div class="blog-post"> \
                <header class="blog-header"> I\'m Sorry! </header> \
                <hr /> \
                <section class="blog-body"> There are no blog posts, please check back later! </section> \
                <footer class="blog-footer"> 6-9-2017 | Brett Svendsen </footer> \
            </div>'

        )

    }
    
	$("#content").append( blogSection );

}

// Creates the Blog Post
function createBlogPost ( blog ) { 

    var title = $("<header></header>")
        .text( blog.title )
        .attr("class", "blog-header");
    
    var lineBreak = $("<hr />");
    
    var body = $("<section></section>")
        .text( blog.content )
        .attr("class", "blog-body");
    
    var footer = $("<footer></footer>")
        .text( blog.date + " | " + blog.author)
        .attr("class", "blog-footer");
    
    return blogFull = $("<div></div>")
        .append( [title, lineBreak, body, footer] )
        .attr("class", "blog-post");

}





// Adds Twitter To the Page
function twitterBox () {
	
	var twitterSection = $("<section></section>")
		.attr( "class", "twitter-container col-xs-3 col-sm-3 col-md-3 col-lg-3" );
	
	var twitterLink = $("<a></a>")
		.attr( "class", "twitter-timeline" )
		.attr( "href", "https://twitter.com/BrettGameDev" )
		.text( "Tweets by BrettGameDev" );
		
	var twitterScript = $("<script></script>")
		.attr( "async", "true" )
		.attr( "src", "https://platform.twitter.com/widgets.js" )
		.attr( "charset", "utf-8" );
	
	twitterSection.append( [ twitterLink, twitterScript ] );
	
	$("#content").append( twitterSection );
	
}




    //
    //  TODO: Add fetch() for data and then() render page
    //

$(document).ready (function () {
	
	
    renderMainPage();
    
    fillDropdownMenu();
	
});


