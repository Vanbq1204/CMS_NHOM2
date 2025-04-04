package CMS;


/**
 * Generated from IDL interface "CustomerUpdateService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerUpdateServicePOA
	extends org.omg.PortableServer.Servant
	implements org.omg.CORBA.portable.InvokeHandler, CMS.CustomerUpdateServiceOperations
{
	static private final java.util.HashMap<String,Integer> m_opsHash = new java.util.HashMap<String,Integer>();
	static
	{
		m_opsHash.put ( "logCustomerChange", Integer.valueOf(0));
		m_opsHash.put ( "updateCustomerInfo", Integer.valueOf(1));
		m_opsHash.put ( "updateStatus", Integer.valueOf(2));
	}
	private String[] ids = {"IDL:CMS/CustomerUpdateService:1.0"};
	public CMS.CustomerUpdateService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.CustomerUpdateService __r = CMS.CustomerUpdateServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.CustomerUpdateService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.CustomerUpdateService __r = CMS.CustomerUpdateServiceHelper.narrow(__o);
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
			case 0: // logCustomerChange
			{
				java.lang.String _arg0=_input.read_string();
				java.lang.String _arg1=_input.read_string();
				_out = handler.createReply();
				logCustomerChange(_arg0,_arg1);
				break;
			}
			case 1: // updateCustomerInfo
			{
				java.lang.String _arg0=_input.read_string();
				CMS.CustomerInfo _arg1=CMS.CustomerInfoHelper.read(_input);
				_out = handler.createReply();
				_out.write_boolean(updateCustomerInfo(_arg0,_arg1));
				break;
			}
			case 2: // updateStatus
			{
				java.lang.String _arg0=_input.read_string();
				java.lang.String _arg1=_input.read_string();
				_out = handler.createReply();
				_out.write_boolean(updateStatus(_arg0,_arg1));
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
