If Datatable.GetSheet("Casos").GetCurrentRow = 0 Then
	
	SystemUtil.CloseProcessByName "iexplore.exe"
	SystemUtil.Run "iexplore.exe", "www.google.com"

	'Creation of sheets
	DataTable.AddSheet("Search Data")
	
	'Import of data
	Datatable.ImportSheet "..\datatables\google.xlsx", "Casos", "Casos"
	Datatable.ImportSheet "..\datatables\google.xlsx", "Search Data", "Search Data"
	
End  If

If DataTable.Value ("p_execute", "Casos") = "Y" Then	
	
	'Create the data table objects
	Set dtCasos = Datatable.GetSheet("Casos")
	Set dtSearchData = Datatable.GetSheet("Search Data")
	'Set the current rows for each Tab based on the current row of the Casos tab
	dtSearchData.SetCurrentRow(dtCasos.GetCurrentRow)
	
	'--------------------Search something---------------------
	
	
	Browser("Google").Page("Google").WebEdit("Buscar").Set DataTable.Value("p_search_data","Search Data") @@ hightlight id_;_Browser("Google").Page("Google").WebEdit("Buscar")_;_script infofile_;_ZIP::ssf1.xml_;_
	Browser("Google").Page("Google").WebButton("Buscar con Google").Click @@ hightlight id_;_Browser("Google").Page("Google").WebButton("Buscar con Google")_;_script infofile_;_ZIP::ssf2.xml_;_
	
	If Browser("opentitle:=Google").Page("title:=.*").WebElement("html id:=resultStats").Exist(3) Then
		Reporter.ReportEvent micPass, "Search on google", "the search was correctly made, yay"
		Browser("opentitle:=Google").Page("title:=.*").Image("alt:=Google").Click
		ExitActionIteration
	Else
		Reporter.ReportEvent micFail, "Search on google", "There was an error during the search"
		Browser("opentitle:=Google").Page("title:=.*").Image("alt:=Google").Click
		ExitActionIteration
	End  If
End  If
