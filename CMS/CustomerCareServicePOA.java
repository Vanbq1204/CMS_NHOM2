package CMS;


/**
 * Generated from IDL interface "CustomerCareService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerCareServicePOA
	extends org.omg.PortableServer.Servant
	implements org.omg.CORBA.portable.InvokeHandler, CMS.CustomerCareServiceOperations
{
	static private final java.util.HashMap<String,Integer> m_opsHash = new java.util.HashMap<String,Integer>();
	static
	{
		m_opsHash.put ( "getTicketInfo", Integer.valueOf(0));
		m_opsHash.put ( "getCustomerTicket", Integer.valueOf(1));
		m_opsHash.put ( "updateTicket", Integer.valueOf(2));
		m_opsHash.put ( "createTicket", Integer.valueOf(3));
	}
	private String[] ids = {"IDL:CMS/CustomerCareService:1.0"};
	public CMS.CustomerCareService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.CustomerCareService __r = CMS.CustomerCareServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.CustomerCareService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.CustomerCareService __r = CMS.CustomerCareServiceHelper.narrow(__o);
		return __r;
	}
	public org.omg.CORBA.portable.OutputStream _invoke(String method, org.omg.CORBA.portable.InputStream _input, org.omg.CORBA.portable.ResponseHandler handler)
		throws org.omg.CORBA.SystemException
	{
		org.omg.CORBA.portable.OutputStream _out = null;
		// do something
		// quick lookup of operation
		java.lang.Integer opsIndex = (java.lang.Integer)m_opsHash.get ( method );
		if ( null == opsIndex )
			throw new org.omg.CORBA.BAD_OPERATION(method + " not found");
		switch ( opsIndex.intValue() )
		{
			case 0: // getTicketInfo
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				CMS.CustomerCareHelper.write(_out,getTicketInfo(_arg0));
				break;
			}
			case 1: // getCustomerTicket
			{
				java.lang.String _arg0=_input.read_string();
				_out = handler.createReply();
				CMS.CustomerCareSeqHelper.write(_out,getCustomerTicket(_arg0));
				break;
			}
			case 2: // updateTicket
			{
				java.lang.String _arg0=_input.read_string();
				CMS.CustomerCare _arg1=CMS.CustomerCareHelper.read(_input);
				_out = handler.createReply();
				_out.write_boolean(updateTicket(_arg0,_arg1));
				break;
			}
			case 3: // createTicket
			{
				CMS.CustomerCare _arg0=CMS.CustomerCareHelper.read(_input);
				_out = handler.createReply();
				java.lang.String tmpResult31 = createTicket(_arg0);
_out.write_string( tmpResult31 );
				break;
			}
		}
		return _out;
	}

	public String[] _all_interfaces(org.omg.PortableServer.POA poa, byte[] obj_id)
	{
		return ids;
	}
}
