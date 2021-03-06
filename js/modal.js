$(document).ready(function() {
  // MODAL
  var modalText = {
    customerportal: {
      title: 'Customer Portal',
      tag: 'CUSTOMER COMPLAINT PORTAL.',
      detail:
        'ChowNow Discover is a platform that lets customers discover new local restaurants and provides business owners with tools to convert first time orders into lifelong diners.',
      link: 'https://eat.chownow.com/'
    },
    thunder: {
      title: 'Thunder',
      tag: 'FINANCIAL APPLICATION.',
      detail:
        'Thunder is a financial service web application, small group of peoples are using, maintaining & viewing their financial shares in grapical view'
    },
    recordmanagement: {
      title: 'Record Management',
      tag: 'DOCUMENT MANAGEMENT SYSTEM.',
      detail:
        'A document management system for the users to create and manage their product specific documents and approvals.'
    },
    productapproval: {
      title: 'Product Approval',
      tag: 'BUSINESS PROCESS AUTOMATION.',
      detail:
        'This is an approval workflow applicable for each product release to confirm the product adherence with environment regulations of different countries. A SharePoint hosted site written in Javascript.'
    },
    thundermobile: {
      title: 'Thunder Mobile',
      tag: 'FINANCIAL APPLICATION.',
      detail:
        'Thunder Mobile is a financial service application, small group of peoples are using, maintaining & viewing their financial shares in grapical view'
    },
    staffportal: {
      title: 'Staff Portal',
      tag: 'INTRANET PORTAL',
      detail:
        'Staff Portal is an intranet portal developed on SharePoint Online for their Asia Specific entities. This portal supports around 13 departments and each department has its own dashboard. This portal is built with SPFx & JavaScript.'
    },
    intranet: {
      title: 'Intranet',
      tag: 'INTRANET PORTAL.',
      detail:
        'Intranet portal developed on SharePoint Server 2019 for a Singapore Government Agency Website. This portal supports around 5 departments and each department has its own dashboard. This portal also supports for grapical reports for active users and records. This portal is built with SPFx & React.'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('images/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
