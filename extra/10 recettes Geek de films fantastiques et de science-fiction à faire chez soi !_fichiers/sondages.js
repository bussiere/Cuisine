$j = jQuery.noConflict();

function b64encode(str) {
	return window.btoa(str);
}

function b64decode(str) {
	return window.atob(str);
}

function setCookie(c_name, value, exdays, path) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value + ";path=" + path;
}

function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++)
	{
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name)
		{
			return unescape(y);
		}
	}
}

function uniqId() {
	return parseInt(+new Date() * Math.random());
}

function addslashes(s) {
	return s.replace(/(\"|\'|\\)/g, '\$1');
}

function stripslashes(s) {
	return s.replace(/\\/g, "");
}

function escape_quotes(s) {
	return s.replace(/\"/g, '&quot;');
}

function getScoreFbShare(url, score, name, nbquestions) {
	var image = $j('.illustration').attr('src');
	var facebook_url = "http://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]=" + url + "&p[images][0]="+image+"&p[title]="+addslashes(name)+"&p[summary]="+addslashes("J\\\'ai fait un score de ")+score+" point(s), peux tu faire mieux ?";
	return '<a class="fb-flat-share-quizz uppercase pointer" onclick="window.open(\
								      \'' + facebook_url + '\',\
								      \'facebook-share-dialog\',\
								      \'width=626,height=436\');\
								    return false;">\
								Partager sur facebook</a>';
}

function reloadPage(anchor) {
	location.href=location.href.split(/\?|#/)[0] + '#' + anchor;   
	location.reload(true);
	return false;
}

function getRightOrWrong(dude_answer, right_answer) {
	var right = [
		'Bravo ! La bonne réponse était bien : ' + stripslashes(right_answer),
		'Effectivement, il fallait répondre : ' + stripslashes(right_answer),
		'Great ! Tu as donné la bonne réponse : ' + stripslashes(right_answer)
	];
	var wrong = [
		'Oups ! Tu t\'es trompé à cette question',
		'Non, ce n\'était pas la bonne réponse',
		'Tu as donné la mauvaise réponse pour cette question'
	];
	
	if (dude_answer == right_answer) {
		return '<li class="bold" style="background-color:rgba(46,204,79,0.7);color:#FFFFFF;padding:2px;border-radius:2px;">'+right[Math.floor(Math.random() * right.length)]+'</li>';
	} else {
		return '<li class="bold" style="background-color:rgba(231,76,60,0.7);color:#FFFFFF;padding:2px;border-radius:2px;">'+wrong[Math.floor(Math.random() * wrong.length)]+'</li>';
	}
}

function getQuizzResultsTemplate(score, results, sondage_name, nbquestions, answers, url, all_scores, nbanswers, scontent, share) {
	
	var total_score = 0;
	var higher_scores = 0;
	var q = 1;
		
	for (scores in all_scores) {
		total_score = parseInt(all_scores[scores]) + total_score;
		if (all_scores[scores] > score) {
			higher_scores ++;
		}
	}
	var moyenne = Math.ceil(total_score / nbanswers);
	var your_score = (score - moyenne);
	
	var higher_percent = parseInt(higher_scores) * 100 / parseInt(nbanswers);
	
	if (score == nbquestions) {
		var text = 'Bravo ! Tu as toutes les bonnes réponses. You\'re the best !';
	} else if (your_score > 0) {
		var text = 'Pas mal, tu as fait mieux que ' + (100 - Math.ceil(higher_percent)) + '% des participants à ce quizz. Tu as ' + your_score + ' points de plus que la moyenne ! Tu retentes pour faire un perfect ?';
	} else if (your_score == 0) {
		var text = 'Pile dans la moyenne ! C\'est déjà pas mal, mais tu peux retenter ta chance pour faire encore mieux.';
	} else {
		var text = 'Ouille, tu as fait moins bien que ' + Math.ceil(higher_percent) + '% des participants avec ' + (your_score * -1) + ' points de moins que la moyenne ! Tu peux recommencer pour améliorer ton score.'
	}
	
	res = '\
	<div class="content-title">\
		<h2>' + sondage_name + '</h2>\
	</div>';
	
	res += '<div class="result-quizz">\
		<center>\
		<div class="content-result-quizz">\
			<p class="uppercase score-quizz">Tu as obtenu <span class="redder">' + score + '/'+ nbquestions +' point(s)</span> !</p>';
	res += '<p class="text-quizz">' + text + '</p>';
	
	if ("no" != share) { // disable sharing in app
		res += '<p class="uppercase friends-quizz">Est-ce que tes amis vont faire mieux ?</p>';
		res += getScoreFbShare(url, score, sondage_name, nbquestions);
		res += '<p>ou, partage ce lien : <input onclick="this.select();" class="input-share-quizz" type="text" value="' + url + '" /></p>';
	}
	
	res += '<input class="button-restart" type="button" onclick="return reloadPage(\'quizz\');" value="Réessayer" />';
	res += '</div>\
	</center>\
	</div>';
	//reponses vrai ou fausse
	res += '<ul>';
	res += '<center>';
	res += '<p class="uppercase friends-quizz">Récapitulatif de tes réponses</p>';
	for (question in scontent) {
		res += '<ul style="border:none;"><li style="font-style:italic;">'+q+'°) '+ stripslashes(question) +'</li>';
		for (rep in answers) {
			if (rep == question) {
				res += getRightOrWrong(answers[rep], scontent[question]['question_response']);
			}
		}
		q++;
	}
	
	if ("no" != share) { // disable sharing in app
		res += '<p class="uppercase friends-quizz">N\'oublie pas de partager tes performances !</p>';
		res += getScoreFbShare(url, score, sondage_name, nbquestions);
	}
	
	res += '<div style="margin-top:10px;"></div>'
	res += '</center>';
	res += '</ul>';
	
	return res;
}

function getQuizzAnswersTemplate(scontent, answers) {
	var q = 1;
	var res = '';
	for (question in scontent) {
		for (rep in answers) {
			if (rep == question) {
				res += '<ul style="border:none;"><li style="font-style:italic;">'+q+'°) '+ stripslashes(question) +'</li>';
				res += getRightOrWrong(answers[rep], scontent[question]['question_response']);
				res += '</ul>';
			}
		}
		q++;
	}
	return res;
}

function getAnswerResultsTemplate(results, sondage_name, nbquestions, answer) {
	
	nbquestions = ((nbquestions == undefined) ? 2 : nbquestions)
	var dude_answer = answer;
	
	str = '\
	<div class="content-title" id="quizz">\
		<h2>' + stripslashes(sondage_name) + '</h2>\
	</div>';
	
	for (question in results) {
		if (parseInt(results[question].nbvotes) > 100) {
			str += '\
			<div style="padding: 0 0 9px 15px;" class="content-title">\
				<h3 style="font-style:italic;font-size:15px;color:#2d2d2d;">Sondage effectué auprès de '+ results[question].nbvotes +' personnes.</h3>\
			</div>';
			break;
		}
	}

	for (question in results) {
		str += ( nbquestions > 1 ? "<h4>" + stripslashes(question) +"</h4>" : "" );
		str += '<ul>';
		for(answer in results[question].answers){
			pourcentage = parseInt(results[question].answers[answer]) * 100 / parseInt(results[question].nbvotes);
			// max width on article = 320px, max width on block = 130px;
			str += "<li><div class='inline-block scores-bar' "+(($j('.sondage_container').width() > 320) ? "" : "style='top:5px;'" )+">";
			str += "<div class='background-bar-sondage' style='width:" + pourcentage + "%;'></div>";
			str += "<div class='bold scoring-question' "+(($j('.sondage_container').width() > 320) ? "" : "style='width:70%;top:5px;left:15px'" )+">" + stripslashes(answer) + "</div>";
			// str +=  "<div class='inline-block scoring-bar'><strong>" + ( pourcentage == 0 ? 0 : pourcentage.toFixed(1).toString().replace('.0', '').replace('.', ',')) + "%"+ (($j('.sondage_container').width() > 320) ? " - " + parseInt(results[question].answers[answer]) + " vote(s)" : "") +"</strong></div></li>";
			str += "<div class='inline-block scoring-bar'><strong>" + ( pourcentage == 0 ? 0 : pourcentage.toFixed(1).toString().replace('.0', '').replace('.', ',')) + "%</strong></div>";
			str += "</div></li>";
		}
		str += '</ul>';
	}
	
	return str;
}

function getSubmitButton() {
	return '<center style="background-color:#f9f9f9;"><input type="submit" class="sondage_validate" name="submit" value="Envoyer mon vote"></center>';
}

function getNextButton(qid, slength) {
	return '<center style="background-color:#f9f9f9;"><button type="button" class="next-question" data-qid="' + qid + '" data-slength="' + slength + '">Question suivante</button></center>';
}

function getQuestionInputTemplate(sondage_id, answer, question_type, question, selected) {
	var checked = (selected !== undefined ? 'checked' : '');
	var data_id = $j('.sondage_container').attr('data-id');
	id = uniqId();
	
	switch (question_type) {
		case 'checked' :

		template = '<li><div class="sondage_checkbox scores-bar"><div class="scoring-question" '+(($j('.sondage_container').width() > 320) ? '' : 'style="width:70%;top:5px;left:15px"' )+'>\
		<input type="checkbox" id="' + id + '" name="answers[' + escape_quotes(question) + '][' + escape_quotes(answer) + ']" value="' + escape_quotes(answer) + '">\
		<label data-id="'+sondage_id+'" class="bold '+(($j('.sondage_container').width() > 320) ? '' : 'little_radio' )+'" for="' + id + '">' + stripslashes(answer)  + '</label>\
		</div></li>';

		break;

		case 'radio' :

		template = '<li><div class="sondage_radio scores-bar' + (selected !== undefined ? ' selected' : '') + '"><div class="scoring-question" '+(($j('.sondage_container').width() > 320) ? '' : 'style="width:70%;top:5px;left:15px"' )+'>\
		<input type="radio" id="' + id + '" name="answers[' + escape_quotes(question) + ']" value="' + escape_quotes(answer) + '" ' + checked + ' >\
		<label data-id="'+sondage_id+'" class="bold '+(($j('.sondage_container').width() > 320) ? '' : 'little_radio' )+'" for="' + id + '">' + stripslashes(answer)  + '</label></div>\
		</div></li>';
		break;

	}
	return template;
}

function getQuestionTemplate(question_name, questionObj, qid, nbquestions, increment, sondage_id){

	nbquestions = ((nbquestions == undefined) ? 2 : nbquestions)

	title = ((nbquestions > 1) ? "<h6>" + "Question "+increment+"/"+nbquestions+" - <span class='sond-nbquestions'>" + question_name.replace(/\\/g, "")+"</span></h6>" : "");
	
	template = '<form>';
	template +=
	'\
	<div class="questions-padd" id="' + qid + '">\
	' + title +'';

	i = 1
	template += '<ul>';
	$j.each(questionObj.answers, function(index, value) {
		if (questionObj.question_type == 'radio' && i == 1) {
			template += getQuestionInputTemplate(sondage_id, index, questionObj.question_type, question_name, 'checked');
			i++;
		} else {
			template += getQuestionInputTemplate(sondage_id, index, questionObj.question_type, question_name);
		}
	});
	template += '</ul>';

	template += '</div>';
	template += '</form>';

	return template;
}

function buildResults(sondages, sondage_id) {
	for (key in sondages) {
		if(sondages[key] == sondage_id) {
			data = {sondage_id : sondage_id};
			$j.post('/server.php?action=get_results', data, function(response){

				var response 			= $j.parseJSON(response);
				var id 					= response.data.id;
				var sondage_name 		= response.data.sondage_name;
				var sondage_real_name 	= response.data.sondage_real_name;
				
				var sondage_type 	= response.data.sondage_type;
				var score 			= response.data.score;
				var results			= $j.parseJSON(response.data.results);
				var c = 0;
				
				// compter nb question
				for(key in results){c++;}
				
				if ('sondage' == sondage_type) {
					var resTpl = getAnswerResultsTemplate(results, sondage_real_name, c);
					$j('.sondage_container[data-id=' + sondage_id + ']').html(resTpl);
				} else if('quizz' == sondage_type) {
					var resTpl = getQuizzResultsTemplate(score, results, sondage_real_name, c);
					$j('.sondage_container[data-id=' + sondage_id + ']').html(resTpl);
				}
			});
			return 1;
		}
	}
}

$j(document).ready(function(){


	$j('.sondage_container').each(function(){

		if ($j(this).html().length > 0) {
			$j(this).empty();
		}
		
		sondage_id = $j(this).data('id');
		data = {sondage_id : sondage_id};
		
		// checker les cookies ici
		if (typeof getCookie('voted_sondages') == 'undefined') {
			// pas de cookies, je le cree
			setCookie('voted_sondages', b64encode('[]'), 365, "/");
			votedArray = $j.parseJSON(b64decode(getCookie('voted_sondages')));
		} else {
			votedArray = $j.parseJSON(b64decode(getCookie('voted_sondages')));
		}
		
		$j.post('/server.php?action=get-sondage', data, function(res) {
			res = $j.parseJSON(res);
			var sondage_name = res.data.name;
			var sondage_real_name = res.data.real_name;
			var sondage_id = res.data.id;
			
			if (res.status == 'KO') {
				if ('date_end' == res.error_type && 'quizz' != res.data.sondage_type) {
					buildResults([sondage_id], sondage_id);
				} else {
					$j('.sondage_container[data-id='+sondage_id+']').hide();
				}
				
				return false;
			} else {
				$j.each(votedArray, function(sid, answer_id) {
					if (sondage_id == sid) {
						buildResults([sondage_id], sondage_id);
						return false;
					}
				});
			}
			
			$container = $j('.sondage_container[data-id='+sondage_id+']');
			$container.html();
			// objet contenant toutes les question du sondage
			sondage = $j.parseJSON(res.data.content);

			// recuperer la length du sondage(nbr de questions)
			slength = 0;
			$j.map(sondage, function(value, key) {
				slength++;
			});

			/*
			creer une div pour chaque question (display seulement 1 a la fois, les autre hide())
			avec le formulaire de reponse, et un bouton next
			sur la derniere question mettre un bouton submit(valider)
			qui fait une requete ajax pour insert dans la table sondage_answers
			*/

			var sondage_title = '\
			<div class="content-title">\
			<h2>' + sondage_real_name.replace(/\\/g, "") + '</h2>\
			</div>';

			$container.append(sondage_title);
			var i = 1;
			j = i;
			$j.map(sondage, function(value, key) {

				var qid = sondage_name + '_' + i;
				// key = key.replace(/\\("|'|\\)/g, "$1");
				
				question_div = getQuestionTemplate(key, value, qid, slength, i, sondage_id);
				
				// si il y a plus de 1 question et que la question courante n'est pas la première, div.hide()
				if (i != 1) {
					$div = $j('<div class="question_container"></div>').append(question_div);
					$div.find('#' + qid).hide();
					$container.append($div);
				} else {
					$div = $j('<div class="question_container" ></div>').append(question_div);
					$container.append($div);
				}
				i++;
			});
			// si 1 seul question, bouton valider, sinon, bouton next
			// mais ajouter le bouton qu'une fois
			if (slength == 1) {
				button = getSubmitButton();
			} else {
				qid = sondage_name + '_' + (j+ 1);
				button = getNextButton(qid, slength);
			}

			$container.append(button);
		});
		
	});

	$j(document).on('change', '.scoring-question input', function() {
		$j('.scores-bar').removeClass('selected');
		if ($j(this).is(':checked') || $j(this).is(':selected')) {
			$j(this).parents('.scores-bar').addClass('selected');
		}
	});
	
	$j(document).on('click', '.scores-bar', function(e) {
		if (!$j(e.target).is('label')) {
			$j(this).find('label').click();
		}
	});
	
	// event de click sur next pour affichier la div avec la next question
	// ou le bouton valider
	$j(document).on('click', '.next-question', function(){

		qid = $j(this).data('qid');
		slength = parseInt($j(this).data('slength'));
		str = qid;
		lastindex = str.lastIndexOf('_');
		sondage_name = str.substring(0,lastindex);
		strend = str.substring((lastindex - 1),str.length);

		// nombre de la question a afficher
		qnbid = strend.split('_').pop();

		curr_question_qid = '#' + sondage_name + '_' + (parseInt(qnbid) - 1);
		next_question_qid = '#' + sondage_name + '_' + qnbid;

		// $j(curr_question_qid).hide();
		// $j(next_question_qid).show();
		$j(curr_question_qid).hide("slide", {direction: 'left'}, "fast", function() {
			$j(next_question_qid).show("slide", {direction: 'right'}, "fast");
		});

		if (qnbid == slength) {
			button = getSubmitButton();
			$j(this).replaceWith(button);
		} else {
			newqid = sondage_name + '_' + (parseInt(qnbid) + 1)
			button = getNextButton(newqid, slength);
			$j(this).replaceWith(button);
		}

	});

	// event de click sur valider pour envoyer les reponses au server
	$j(document).on('click','.sondage_validate', function() {

		data = [];
		
		sondage_id = $j(this).parents('.sondage_container').data('id');
		$container = $j('.sondage_container[data-id='+sondage_id+']');
		
		var share = ("no" == $container.attr("data-share") ? "no" : "yes");
		
		/*if (getCookie('voted_sondages') !== undefined) {
			votedArray = $j.parseJSON(b64decode(getCookie('voted_sondages')));
			for (key in votedArray) {
				if (votedArray[key] == sondage_id) {
					$j('.sondage_container[data-id='+sondage_id+']').css('display','none');
					return false;
				}
			}
			$j.each(votedArray, function(sid, answer_id) {
				
			});
		}*/

		$container.find('input').each(function() {
			// 1 input from 1 question
			// si la valeur de l'input n'est pas null
			var input = $j(this).serializeArray();
			if (input.length > 0) {
				data.push(input[0]);
			}
			/*
			else {
				if (!$j(this).is('input:radio')) {
					final_array.push({
						name : $j(this).attr('name'),
						value : ''
					});
				}
			}
			*/
		});

		data.push({name : 'sondage_id', value : sondage_id});
		var new_id = $j('.sondage_container[data-id='+sondage_id+']').data('new-id');
		data.push({name : 'new_id', value : new_id});
		
		$j.post('/server.php?action=answer_sondage', data, function(response){

			// faire des check sur response.status pour verifier si ca a marche avant d'afficher les resultats
			var response = $j.parseJSON(response);

			// data
			var sondage_type = response.data.sondage_type;
			var scontent = response.data.sondage_content;
			var results = response.data.results;
			var answer = $j.parseJSON(response.data.answer.content);
			var sondage_name = response.data.sondage_name;
			var sondage_real_name = response.data.sondage_real_name;
			var sondage_all_scores = response.data.all_scores;
			var sondage_nbanswers = response.data.nbanswers;
			var c = 0;
			for (key in results){c++;}
			
			// share url
			if ('quizz' == sondage_type) {
				var url = 'http://hitek.fr/actualite/' + $j(".sondage_container").attr('data-new-url');
			}
			
			// template
			if (response.data.template) {
				var template = response.data.template;
				var vars = response.data.vars;
				vars.answers = getQuizzAnswersTemplate(scontent, answer);
				var output = quizzparser.parse(template, 'start', vars);
			} else {
				if ('sondage' == sondage_type) {
					var output = getAnswerResultsTemplate(results, sondage_real_name, c, answer);
				} else if ('quizz' == sondage_type) {
					var output = getQuizzResultsTemplate(response.data.answer.score, results, sondage_real_name, c, answer, url, sondage_all_scores, sondage_nbanswers, scontent, share);
				}
			}
			
			$container.html(output);
			
			// do NOT log cookie if type was quizz
			if ('quizz' != sondage_type) {
				// INSERTION DU COOKIE DE VERIFICATION POUR NE PAS VOTER PLUSIEURS FOIS
				var sondage_id = $container.data('id');
				var answer_id = response.data.answer.id;
	
				// le cookie existe, push la valeur de l'id du sondage dans le cookie
				var voted = b64decode(getCookie('voted_sondages'));
				var votedArr = $j.parseJSON(voted);
				
				if (0 == votedArr.length) {
					votedArr = new Object();
				}
				
				votedArr[sondage_id] = answer_id;
				
				var newcookiestr = b64encode(JSON.stringify(votedArr));
				setCookie('voted_sondages', newcookiestr, 365, "/");
			}

		});
	});
	
	$j(document).on('submit','#email_form',function(evt){
		evt.preventDefault();
		var data = $j(this).serializeArray();
		if(data[0].value.length < 1){
			alert('entrez un email svp');
			return false;
		}
		$that = $j(this);
		$j.post('/server.php?action=submit_quizz_email', data, function(response){
			response = $j.parseJSON(response);
			$that.replaceWith('<p><em>Merci d\'avoir participé !</em></p>');
		});
	});
	
});