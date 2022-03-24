var duties = ['access information ', 'adjust ', 'allocate ', 'allowance ', 'asset', 'board of directors', 'branding', 'calculate ', 'chart ', 'check ', 'clarify meaning', 'collect data ', 'complete reports ', 'comply with directions ', 'computations ', 'contribute ', 'convert ', 'delegate ', 'determine value ', 'document ', 'documentation ', 'email', 'estimate ', 'explain ', 'feedback ', 'follow procedures ', 'formula ', 'identify ', 'inform ', 'interpret and monitor ', 'interpret charts and graphs ', 'inventory ', 'label ', 'legislative requirements ', 'levels ', 'liability', 'liaise ', 'logistics', 'maintain records ', 'marked ', 'marked out ', 'measuring techniques ', 'monitor ', 'notes ', 'objective', 'opportunity cost', 'outline ', 'outsourcing', 'overhead', 'perform ', 'profitability', 'record data ', 'refer to ', 'report ', 'research and development', 'return on investment', 'revenue', 'shareholder', 'signs, codes and labels ', 'size and proportion ', 'stakeholder', 'supervise ', 'supply chain', 'tagged ', 'team discussions ', 'telecommuting', 'time ', 'tolerance ', 'turnover', 'understanding ', 'unique selling proposition', 'use questions ', 'verbal reporting', 'written reporting'];

// Autocomplete widget
$(function () {
	for (var i = startDay; i <= finishDay; i++) {
		$(`#hour${i}`)
			.children()
			.eq(1)
			.autocomplete({
				source: duties,
				position: {
					collision: 'flip', // if the autocomplete is too low, it will flip to be above
				},
			});
	}
});
