

describe("webpage with network listeners", function() {

    var domain = "http://localhost:8083/";

    var async = new AsyncSpec(this);

    async.it("should open hello.html",function(done) {
        networkUtils.reset();

        networkUtils.init();
        networkUtils.webpage.open(domain + 'hello.html', function(success){
            networkUtils.trace += "CALLBACK:"+success+"\n";
            expect(success).toEqual("success");
            setTimeout(function(){ // wait after the XHR
                done();
            }, 500)
            //done();
        });
    });

    async.it("should generate the expected trace", function(done){
        var expectedTrace = ""
        expectedTrace += "INITIALIZED -1\n";
        expectedTrace += "LOADSTARTED:about:blank\n";
        if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/hello.html\n";
        expectedTrace += "URLCHANGED:http://localhost:8083/hello.html\n";
        expectedTrace += "INITIALIZED 1\n";
        expectedTrace += "LOADFINISHED:http://localhost:8083/hello.html - 2 success\n";
        if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/hello.html\n";
        expectedTrace += "CALLBACK:success\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received hello.html", function(done){
        networkUtils.searchRequest(domain + 'hello.html', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("text/html");
            expect(r.end.contentType).toEqual("text/html");
        });
        done();
    });

    async.it("should have received slimerjs.png", function(done){
        networkUtils.searchRequest(domain + 'slimerjs.png', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("image/png");
            expect(r.end.contentType).toEqual("image/png");
        });
        done();
    });

    async.it("should have received helloframe.html", function(done){
        networkUtils.searchRequest(domain + 'helloframe.html', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("text/html");
            expect(r.end.contentType).toEqual("text/html");
        });
        done();
    });

    async.it("should have received hello.js", function(done){
        networkUtils.searchRequest(domain + 'hello.js', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("text/javascript");
            expect(r.end.contentType).toEqual("text/javascript");
        });
        done();
    });

    async.it("should have received helloframe.css", function(done){
        networkUtils.searchRequest(domain + 'helloframe.css', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("text/css");
            expect(r.end.contentType).toEqual("text/css");
        });
        done();
    });

    async.it("should receive event when a frame is changed", function(done){
        networkUtils.backupTrace();
        networkUtils.reset();

        networkUtils.webpage.evaluate(function(){
            document.getElementsByTagName( "iframe" )[ 0 ].contentWindow.location.href="simplehello.html"
            document.getElementsByTagName( "img" )[ 0 ].src="glouton-home.png"
        })
        setTimeout(function() {
            var expectedTrace = "LOADSTARTED:http://localhost:8083/hello.html\n";
            if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/simplehello.html\n";
            expectedTrace += "LOADFINISHED:http://localhost:8083/hello.html - 0 success\n";
            if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/simplehello.html\n";
            expect(networkUtils.trace).toEqual(expectedTrace);
            expect(networkUtils.receivedRequest.length).toEqual(9);
            networkUtils.searchRequest(domain + 'simplehello.html', function(r){
                expect(r.req).toNotBe(null);
                expect(r.start).toNotBe(null);
                expect(r.end).toNotBe(null);
                expect(r.err).toBeNull();
                expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
                expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
                expect(r.req.method).toEqual("GET");
                expect(r.start.status).toEqual(200);
                expect(r.start.statusText).toEqual('OK');
                expect(r.end.status).toEqual(200);
                expect(r.end.statusText).toEqual('OK');
                expect(r.start.contentType).toEqual("text/html");
                expect(r.end.contentType).toEqual("text/html");
            });
            networkUtils.restoreTrace();
            done();
        },200);
    });

    async.it("is opening a new page",function(done) {
        networkUtils.webpage.open(domain + 'mouseevent.html', function(success){
            networkUtils.trace += "CALLBACK2:"+success+"\n";
            expect(success).toEqual("success");
            done();
        });
    });
    async.it("should generate the expected trace for the new page", function(done){
        var expectedTrace = ""
        expectedTrace += "INITIALIZED -1\n";
        expectedTrace += "LOADSTARTED:about:blank\n";
        if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/hello.html\n";
        expectedTrace += "URLCHANGED:http://localhost:8083/hello.html\n";
        expectedTrace += "INITIALIZED 1\n";
        expectedTrace += "LOADFINISHED:http://localhost:8083/hello.html - 2 success\n";
        if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/hello.html\n";
        expectedTrace += "CALLBACK:success\n";
        expectedTrace += "LOADSTARTED:http://localhost:8083/hello.html\n";
        if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/mouseevent.html\n";
        expectedTrace += "URLCHANGED:http://localhost:8083/mouseevent.html\n";
        expectedTrace += "INITIALIZED 2\n";
        expectedTrace += "LOADFINISHED:http://localhost:8083/mouseevent.html - 3 success\n";
        if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/mouseevent.html\n";
        expectedTrace += "CALLBACK2:success\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received mouseevent.html", function(done){
        networkUtils.searchRequest(domain + 'mouseevent.html', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("text/html");
            expect(r.end.contentType).toEqual("text/html");
        });
        done();
    });

    async.it("is opening an inexistant page",function(done) {
        networkUtils.trace = "";
        networkUtils.receivedRequest = [];
        networkUtils.webpage.open(domain+'plop.html', function(success){
            networkUtils.trace += "CALLBACK:"+success+"\n";
            expect(success).toEqual("success");
            done();
        });
    });
    async.it("should generate the expected trace for an inexistant page", function(done){
        var expectedTrace = ""
        expectedTrace += "LOADSTARTED:http://localhost:8083/mouseevent.html\n";
        if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/plop.html\n";
        expectedTrace += "URLCHANGED:http://localhost:8083/plop.html\n";
        expectedTrace += "INITIALIZED 3\n";
        expectedTrace += "LOADFINISHED:http://localhost:8083/plop.html - 4 success\n";
        if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/plop.html\n";
        expectedTrace += "CALLBACK:success\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received a 404 page", function(done){
        expect(networkUtils.receivedRequest.length).toEqual(2);
        networkUtils.searchRequest(domain + 'plop.html', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toNotBe(null);
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(404);
            expect(r.start.statusText).toEqual('Not Found');
            expect(r.end.status).toEqual(404);
            expect(r.end.statusText).toEqual('Not Found');
            expect(r.start.contentType).toEqual("text/html");
            expect(r.end.contentType).toEqual("text/html");
            expect(r.err.url).toEqual(r.req.url);
            expect(r.err.errorCode).toEqual(203);
            expect(r.err.errorString).toNotEqual('');
        });
        done();
    });

    async.it("is opening a new page from an inexistant domain name",function(done) {
        networkUtils.trace = "";
        networkUtils.receivedRequest = [];
        networkUtils.webpage.open('http://qsdqsdqs.qsfdsfi/plop.html', function(success){
            networkUtils.trace += "CALLBACK:"+success+"\n";
            expect(success).toEqual("fail");
            done();
        });
    });
    async.it("should generate the expected trace for the error page", function(done){
        var expectedTrace = ""
        expectedTrace += "LOADSTARTED:http://localhost:8083/plop.html\n";
        if (URLUtils) expectedTrace += "  loading url=http://qsdqsdqs.qsfdsfi/plop.html\n";
        expectedTrace += "LOADFINISHED:http://localhost:8083/plop.html - 4 fail\n";
        if (URLUtils) expectedTrace += "  loaded url=http://qsdqsdqs.qsfdsfi/plop.html\n";
        expectedTrace += "CALLBACK:fail\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received an error page", function(done){
        expect(networkUtils.receivedRequest.length).toEqual(2);
        networkUtils.searchRequest("http://qsdqsdqs.qsfdsfi/plop.html", function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toBeNull();
            expect(r.end).toNotBe(null);
            expect(r.err).toNotBe(null);
            expect(r.end.contentType).toBeNull()
            expect(r.end.redirectURL).toBeNull()
            expect(r.end.status).toBeNull()
            expect(r.end.statusText).toBeNull()
            expect(r.end.url).toEqual('http://qsdqsdqs.qsfdsfi/plop.html');
            expect(r.req.method).toEqual("GET");
            expect(r.err.url).toEqual(r.req.url);
            expect(r.err.errorCode).toEqual(3);
            expect(r.err.errorString).toNotEqual('');
        });
        done();
    });


    async.it("will open a page and abort the main request",function(done) {
        networkUtils.reset();
        networkUtils.cancelNextRequest = true;

        networkUtils.init()
        networkUtils.webpage.open(domain + 'simplehello.html', function(success){
            networkUtils.trace += "CALLBACK:"+success+"\n";
            expect(success).toEqual("fail");
            done();
        });
    });

    async.it("should generate the expected trace", function(done){
        var expectedTrace = ""
        expectedTrace += "INITIALIZED -1\n";
        expectedTrace += "LOADSTARTED:about:blank\n";
        if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/simplehello.html\n";
        expectedTrace += "LOADFINISHED:about:blank - 1 fail\n";
        if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/simplehello.html\n";
        expectedTrace += "CALLBACK:fail\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received correct data", function(done){
        networkUtils.searchRequest(domain+"simplehello.html", function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toBeNull();
            expect(r.end).toNotBe(null);
            expect(r.err).toNotBe(null);
            expect(r.req.id == r.end.id).toBeTruthy();
            expect(r.end.url).toEqual("http://localhost:8083/simplehello.html");
            expect(r.req.method).toEqual("GET");
            expect(r.end.status).toBeNull();
            expect(r.end.statusText).toBeNull();
            expect(r.end.contentType).toBeNull();
            expect(r.err.errorCode).toEqual(99);
        });
        done();
    });


    async.it("will open a page and cancel a resource request",function(done) {
        networkUtils.reset();
        networkUtils.cancelResourceRequest = true;
        networkUtils.traceResources = true;
        networkUtils.init()
        networkUtils.webpage.open(domain + 'hello.html', function(success){
            networkUtils.trace += "CALLBACK:"+success+"\n";
            expect(success).toEqual("success");
            networkUtils.traceResources = false;
            networkUtils.cancelResourceRequest = false;
            done();
        });
    });

    async.it("should generate the expected trace", function(done){
        networkUtils.traceResources = false;
        networkUtils.cancelResourceRequest = false;
        var expectedTrace = ""
        expectedTrace += "INITIALIZED -1\n";
        expectedTrace += "LOADSTARTED:about:blank\n";
        if (URLUtils) {
            expectedTrace += "  loading url=http://localhost:8083/hello.html\n";
        }
        expectedTrace += "RES REQUESTED http://localhost:8083/hello.html\n";
        expectedTrace += "URLCHANGED:http://localhost:8083/hello.html\n";
        expectedTrace += "RES RECEIVED start - http://localhost:8083/hello.html\n";
        expectedTrace += "RES RECEIVED end - http://localhost:8083/hello.html\n";
        expectedTrace += "INITIALIZED 1\n";
        expectedTrace += "RES REQUESTED http://localhost:8083/hello.js\n";
        expectedTrace += "RES REQUESTED http://localhost:8083/slimerjs.png\n";
        expectedTrace += "    ABORTED http://localhost:8083/slimerjs.png\n";
        expectedTrace += "RES REQUESTED http://localhost:8083/helloframe.html\n";
        expectedTrace += "RES RECEIVED end - http://localhost:8083/slimerjs.png\n";
        expectedTrace += "RES RECEIVED start - http://localhost:8083/hello.js\n";
        expectedTrace += "RES REQUESTED http://localhost:8083/hello.txt\n";
        expectedTrace += "RES RECEIVED end - http://localhost:8083/hello.js\n";
        expectedTrace += "RES RECEIVED start - http://localhost:8083/helloframe.html\n";
        expectedTrace += "RES RECEIVED end - http://localhost:8083/helloframe.html\n";
        expectedTrace += "RES REQUESTED http://localhost:8083/helloframe.css\n";
        expectedTrace += "    ABORTED http://localhost:8083/helloframe.css\n";
        expectedTrace += "RES RECEIVED end - http://localhost:8083/helloframe.css\n";
        //expectedTrace += "RES RECEIVED start - http://localhost:8083/hello.txt\n";
        //expectedTrace += "RES RECEIVED end - http://localhost:8083/hello.txt\n";

        expectedTrace += "LOADFINISHED:http://localhost:8083/hello.html - 2 success\n";
        if (URLUtils) {
            expectedTrace += "  loaded url=http://localhost:8083/hello.html\n";
        }
        expectedTrace += "CALLBACK:success\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received correct data", function(done){
        networkUtils.searchRequest(domain+"hello.html", function(r){
            expect(r.req).toNotBe(null, "req is null");
            expect(r.req.url ).toEqual(domain+"hello.html");
            expect(r.req.method).toEqual("GET");
            expect(r.start).toNotBe(null, "start is null");
            expect(r.start.id).toEqual( r.req.id);
            expect(r.start.url).toEqual(r.end.url);
            expect(r.end).toNotBe(null, "end is null");
            expect(r.end.id).toEqual(r.req.id);
            expect(r.end.url).toEqual(domain+"hello.html");
            expect(r.err).toBeNull();
            expect(r.req.method).toEqual("GET");
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual("OK");
            expect(r.end.contentType).toEqual('text/html');
        });
        done();
    });



    async.it("should open missingresource.html",function(done) {
        networkUtils.reset();

        networkUtils.init();
        networkUtils.webpage.open(domain + 'missingresource.html', function(success){
            networkUtils.trace += "CALLBACK:"+success+"\n";
            expect(success).toEqual("success");
            done();
        });
    });

    async.it("should generate the expected trace", function(done){
        var expectedTrace = ""
        expectedTrace += "INITIALIZED -1\n";
        expectedTrace += "LOADSTARTED:about:blank\n";
        if (URLUtils) expectedTrace += "  loading url=http://localhost:8083/missingresource.html\n";
        expectedTrace += "URLCHANGED:http://localhost:8083/missingresource.html\n";
        expectedTrace += "INITIALIZED 1\n";
        expectedTrace += "LOADFINISHED:http://localhost:8083/missingresource.html - 2 success\n";
        if (URLUtils) expectedTrace += "  loaded url=http://localhost:8083/missingresource.html\n";
        expectedTrace += "CALLBACK:success\n";
        expect(networkUtils.trace).toEqual(expectedTrace);
        done();
    });

    async.it("should have received missignresource.html", function(done){
        networkUtils.searchRequest(domain + 'missingresource.html', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toBeNull();
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(200);
            expect(r.start.statusText).toEqual('OK');
            expect(r.end.status).toEqual(200);
            expect(r.end.statusText).toEqual('OK');
            expect(r.start.contentType).toEqual("text/html");
            expect(r.end.contentType).toEqual("text/html");
        });
        done();
    });

    async.it("should not have received missing.css", function(done){
        networkUtils.searchRequest(domain + 'missing.css', function(r){
            expect(r.req).toNotBe(null);
            expect(r.start).toNotBe(null);
            expect(r.end).toNotBe(null);
            expect(r.err).toNotBe(null);
            expect((r.req.id == r.start.id) && (r.req.id == r.end.id)).toBeTruthy();
            expect((r.req.url == r.start.url) && (r.req.url == r.end.url)).toBeTruthy();
            expect(r.req.method).toEqual("GET");
            expect(r.start.status).toEqual(404);
            expect(r.start.statusText).toEqual('Not Found');
            expect(r.end.status).toEqual(404);
            expect(r.end.statusText).toEqual('Not Found');
            expect(r.start.contentType).toEqual("text/html");
            expect(r.end.contentType).toEqual("text/html");
            expect((r.err.id == r.start.id) && (r.err.id == r.end.id)).toBeTruthy();
            expect((r.err.url == r.start.url) && (r.err.url == r.end.url)).toBeTruthy();
            expect(r.err.errorCode).toEqual(203);
        });
        done();
    });



    async.it("test end", function(done){
        networkUtils.reset();
        done();
    });
});
